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

const localProxyUrl =
  typeof window !== "undefined" && window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8787/api/guide"
    : "";

export async function askOpenAiGuide(
  request: GuideRequest,
): Promise<GuideResponse | null> {
  const proxyUrl = import.meta.env.VITE_OPENAI_PROXY_URL || localProxyUrl;

  if (!proxyUrl) {
    return null;
  }

  const response = await fetch(proxyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { answer?: string };

  if (!data.answer) {
    return null;
  }

  return {
    answer: data.answer,
    source: "openai",
  };
}
