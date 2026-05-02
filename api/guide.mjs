import { handleGuideRequest } from "../server/guide-core.mjs";

function getClientId(request) {
  const forwardedFor = request.headers["x-forwarded-for"];
  const forwardedIp = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor?.split(",")[0];

  return (forwardedIp || request.socket?.remoteAddress || "serverless")
    .trim();
}

function normalizeHeaders(headers) {
  return Object.fromEntries(
    Object.entries(headers ?? {}).map(([key, value]) => [
      key.toLowerCase(),
      Array.isArray(value) ? value.join(",") : String(value ?? ""),
    ]),
  );
}

export default async function handler(request, response) {
  const headers = normalizeHeaders(request.headers);
  const rawBody =
    typeof request.body === "string"
      ? request.body
      : JSON.stringify(request.body ?? {});

  const result = await handleGuideRequest({
    method: request.method ?? "GET",
    pathname: "/api/guide",
    headers,
    rawBody,
    clientId: getClientId(request),
  });

  for (const [key, value] of Object.entries(result.headers)) {
    response.setHeader(key, value);
  }

  response.status(result.status);

  if (result.status === 204) {
    response.end();
    return;
  }

  response.json(result.body);
}
