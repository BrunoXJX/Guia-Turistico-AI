import type { CityResult, WeatherSummary, WikiPlace } from "./travelApis";

export type GuideRequest = {
  question: string;
  city?: CityResult;
  weather?: WeatherSummary | null;
  places: WikiPlace[];
};

export type GuideResponse = {
  answer: string;
  source: "openai" | "local";
};

const requestTimeoutMs = 18_000;

const localProxyUrl =
  typeof window !== "undefined" && window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8787/api/guide"
    : "";

function resolveProxyUrl() {
  const configuredUrl = import.meta.env.VITE_OPENAI_PROXY_URL || localProxyUrl;

  if (!configuredUrl || typeof window === "undefined") {
    return "";
  }

  try {
    const url = new URL(configuredUrl, window.location.origin);
    const isLocal =
      url.protocol === "http:" &&
      ["127.0.0.1", "localhost"].includes(url.hostname);
    const isSecure = url.protocol === "https:";

    if (!isLocal && !isSecure) {
      return "";
    }

    return url.toString();
  } catch {
    return "";
  }
}

function trimText(value: string, maxLength: number) {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function buildSafeRequest(request: GuideRequest): GuideRequest {
  return {
    question: trimText(request.question, 500),
    city: request.city
      ? {
          ...request.city,
          name: trimText(request.city.name, 80),
          country: trimText(request.city.country, 80),
        }
      : undefined,
    weather: request.weather
      ? {
          ...request.weather,
          label: trimText(request.weather.label, 80),
        }
      : null,
    places: request.places.slice(0, 5).map((place) => ({
      ...place,
      title: trimText(place.title, 100),
      description: trimText(place.description, 220),
    })),
  };
}

export async function askOpenAiGuide(
  request: GuideRequest,
): Promise<GuideResponse | null> {
  const proxyUrl = resolveProxyUrl();
  const safeRequest = buildSafeRequest(request);

  if (!proxyUrl || safeRequest.question.length < 2) {
    return null;
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), requestTimeoutMs);

  try {
    const response = await fetch(proxyUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      signal: controller.signal,
      body: JSON.stringify(safeRequest),
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { answer?: string };
    const answer = data.answer ? trimText(data.answer, 1_600) : "";

    if (!answer) {
      return null;
    }

    return {
      answer,
      source: "openai",
    };
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeout);
  }
}
