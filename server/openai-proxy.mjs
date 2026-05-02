import http from "node:http";

const port = Number(process.env.PORT ?? 8787);
const model = process.env.OPENAI_MODEL ?? "gpt-5.4-mini";
const apiKey = process.env.OPENAI_API_KEY;

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Pedido demasiado grande"));
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function send(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  });
  response.end(JSON.stringify(payload));
}

function buildPrompt(payload) {
  const city = payload.city
    ? `${payload.city.name}, ${payload.city.country}`
    : "localização desconhecida";
  const weather = payload.weather
    ? `${payload.weather.label}, ${payload.weather.temperature} °C, vento ${payload.weather.windSpeed} km/h`
    : "sem dados de clima";
  const places = (payload.places ?? [])
    .slice(0, 5)
    .map((place) => `- ${place.title}: ${place.description}`)
    .join("\n");

  return [
    "És o guia turístico do app VOYAGE AI.",
    "Responde em PT-PT, com tom natural, útil e conciso.",
    "Usa apenas os dados de contexto enviados. Se não souberes, diz que vais sugerir uma alternativa segura.",
    "",
    `Cidade/contexto: ${city}`,
    `Clima: ${weather}`,
    `Locais próximos:\n${places || "- sem locais próximos"}`,
    "",
    `Pergunta do utilizador: ${payload.question}`,
  ].join("\n");
}

const server = http.createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    send(response, 204, {});
    return;
  }

  if (request.url !== "/api/guide" || request.method !== "POST") {
    send(response, 404, { error: "Not found" });
    return;
  }

  if (!apiKey) {
    send(response, 500, {
      error:
        "OPENAI_API_KEY não está definida no ambiente do servidor. Não coloques a chave no frontend.",
    });
    return;
  }

  try {
    const payload = JSON.parse(await readBody(request));
    const openAiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        input: buildPrompt(payload),
        max_output_tokens: 450,
      }),
    });

    const data = await openAiResponse.json();

    if (!openAiResponse.ok) {
      send(response, openAiResponse.status, {
        error: data.error?.message ?? "Erro na OpenAI API",
      });
      return;
    }

    send(response, 200, {
      answer:
        data.output_text ??
        data.output?.flatMap((item) => item.content ?? [])
          ?.map((content) => content.text)
          ?.filter(Boolean)
          ?.join("\n") ??
        "",
    });
  } catch (error) {
    send(response, 500, {
      error: error instanceof Error ? error.message : "Erro inesperado",
    });
  }
});

server.listen(port, () => {
  console.log(`VOYAGE AI OpenAI proxy ativo em http://127.0.0.1:${port}`);
});
