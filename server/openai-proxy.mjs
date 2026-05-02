import http from "node:http";
import { getMaxBodyBytes, handleGuideRequest } from "./guide-core.mjs";

const port = Number(process.env.PORT ?? 8787);

function getClientId(request) {
  const forwardedFor = request.headers["x-forwarded-for"];
  const forwardedIp = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor?.split(",")[0];

  return (forwardedIp || request.socket.remoteAddress || "local").trim();
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    let bytes = 0;

    request.on("data", (chunk) => {
      bytes += chunk.byteLength;

      if (bytes > getMaxBodyBytes()) {
        const error = new Error("Pedido demasiado grande");
        error.status = 413;
        reject(error);
        request.destroy();
        return;
      }

      body += chunk;
    });

    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function send(response, result) {
  response.writeHead(result.status, result.headers);

  if (result.status === 204) {
    response.end();
    return;
  }

  response.end(JSON.stringify(result.body));
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host}`);

  try {
    const rawBody =
      request.method === "POST" ? await readBody(request) : "";
    const result = await handleGuideRequest({
      method: request.method ?? "GET",
      pathname: url.pathname,
      headers: request.headers,
      rawBody,
      clientId: getClientId(request),
    });

    send(response, result);
  } catch (error) {
    const status =
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      Number(error.status) === 413
        ? 413
        : 500;

    send(response, {
      status,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      },
      body: {
        error:
          status === 413 ? "Pedido demasiado grande" : "Erro inesperado",
      },
    });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`VOYAGE AI proxy ativo em http://127.0.0.1:${port}`);
});
