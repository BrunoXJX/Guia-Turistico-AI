export type CityResult = {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  admin1?: string;
};

export type WeatherSummary = {
  temperature: number;
  apparentTemperature: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  rainProbability: number;
  label: string;
};

export type WikiPlace = {
  pageId: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  distanceMeters: number;
  url: string;
  thumbnail?: string;
};

const weatherLabels: Record<number, string> = {
  0: "Céu limpo",
  1: "Pouco nublado",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Nevoeiro",
  48: "Nevoeiro gelado",
  51: "Chuvisco ligeiro",
  53: "Chuvisco",
  55: "Chuvisco forte",
  61: "Chuva ligeira",
  63: "Chuva",
  65: "Chuva forte",
  71: "Neve ligeira",
  80: "Aguaceiros",
  95: "Trovoada",
};

const trustedApiHosts = new Set([
  "api.open-meteo.com",
  "geocoding-api.open-meteo.com",
  "pt.wikipedia.org",
  "en.wikipedia.org",
]);

const trustedImageHosts = new Set(["upload.wikimedia.org"]);

function requireTrustedHttpsUrl(url: string, hosts: Set<string>) {
  const parsed = new URL(url);

  if (parsed.protocol !== "https:" || !hosts.has(parsed.hostname)) {
    throw new Error("Endpoint externo não autorizado");
  }

  return parsed.toString();
}

function optionalTrustedUrl(url: string | undefined, hosts: Set<string>) {
  if (!url) {
    return undefined;
  }

  try {
    return requireTrustedHttpsUrl(url, hosts);
  } catch {
    return undefined;
  }
}

function assertCoordinates(latitude: number, longitude: number) {
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error("Coordenadas inválidas");
  }
}

async function fetchJson<T>(url: string, timeoutMs = 9_000): Promise<T> {
  const safeUrl = requireTrustedHttpsUrl(url, trustedApiHosts);
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  const response = await fetch(safeUrl, {
    headers: { Accept: "application/json" },
    referrerPolicy: "no-referrer",
    signal: controller.signal,
  }).finally(() => window.clearTimeout(timeout));

  if (!response.ok) {
    throw new Error(`Pedido falhou (${response.status})`);
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    throw new Error("Resposta externa inesperada");
  }

  return response.json() as Promise<T>;
}

export async function searchCities(query: string): Promise<CityResult[]> {
  const cleanQuery = query.trim().slice(0, 80);

  if (cleanQuery.length < 2) {
    return [];
  }

  const params = new URLSearchParams({
    name: cleanQuery,
    count: "8",
    language: "pt",
    format: "json",
  });

  const data = await fetchJson<{
    results?: Array<{
      id: number;
      name: string;
      country: string;
      latitude: number;
      longitude: number;
      timezone: string;
      admin1?: string;
    }>;
  }>(`https://geocoding-api.open-meteo.com/v1/search?${params}`);

  return (data.results ?? []).filter((city) => {
    return (
      Number.isFinite(city.latitude) &&
      Number.isFinite(city.longitude) &&
      Boolean(city.name) &&
      Boolean(city.country)
    );
  });
}

export async function getWeather(
  latitude: number,
  longitude: number,
): Promise<WeatherSummary> {
  assertCoordinates(latitude, longitude);

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current:
      "temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m",
    hourly: "precipitation_probability",
    forecast_days: "1",
    timezone: "auto",
  });

  const data = await fetchJson<{
    current: {
      temperature_2m: number;
      apparent_temperature: number;
      precipitation: number;
      weather_code: number;
      wind_speed_10m: number;
    };
    hourly?: {
      precipitation_probability?: number[];
    };
  }>(`https://api.open-meteo.com/v1/forecast?${params}`);

  const rainProbability =
    data.hourly?.precipitation_probability?.find((value) => value > 0) ?? 0;

  return {
    temperature: Math.round(data.current.temperature_2m),
    apparentTemperature: Math.round(data.current.apparent_temperature),
    precipitation: data.current.precipitation,
    weatherCode: data.current.weather_code,
    windSpeed: Math.round(data.current.wind_speed_10m),
    rainProbability,
    label: weatherLabels[data.current.weather_code] ?? "Condições variáveis",
  };
}

export async function getNearbyWikiPlaces(
  latitude: number,
  longitude: number,
): Promise<WikiPlace[]> {
  assertCoordinates(latitude, longitude);

  const places = await fetchWikiPlacesForLanguage("pt", latitude, longitude);

  if (places.length > 0) {
    return places;
  }

  return fetchWikiPlacesForLanguage("en", latitude, longitude);
}

async function fetchWikiPlacesForLanguage(
  language: "pt" | "en",
  latitude: number,
  longitude: number,
): Promise<WikiPlace[]> {
  assertCoordinates(latitude, longitude);

  const params = new URLSearchParams({
    action: "query",
    generator: "geosearch",
    prop: "coordinates|pageimages|description|info",
    inprop: "url",
    pithumbsize: "420",
    ggscoord: `${latitude}|${longitude}`,
    ggsradius: "10000",
    ggslimit: "10",
    format: "json",
    origin: "*",
  });

  const data = await fetchJson<{
    query?: {
      pages?: Record<
        string,
        {
          pageid: number;
          title: string;
          description?: string;
          fullurl?: string;
          thumbnail?: { source: string };
          coordinates?: Array<{ lat: number; lon: number; dist?: number }>;
        }
      >;
    };
  }>(`https://${language}.wikipedia.org/w/api.php?${params}`);

  return Object.values(data.query?.pages ?? {})
    .map((page) => {
      const coordinates = page.coordinates?.[0];

      return {
        pageId: page.pageid,
        title: page.title,
        description: page.description ?? "Local com interesse cultural",
        latitude: coordinates?.lat ?? latitude,
        longitude: coordinates?.lon ?? longitude,
        distanceMeters: Math.round(coordinates?.dist ?? 0),
        url:
          optionalTrustedUrl(page.fullurl, trustedApiHosts) ??
          `https://${language}.wikipedia.org/wiki/${encodeURIComponent(
            page.title,
          )}`,
        thumbnail: optionalTrustedUrl(page.thumbnail?.source, trustedImageHosts),
      };
    })
    .sort((a, b) => a.distanceMeters - b.distanceMeters);
}

export function getBrowserLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalização indisponível neste browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000,
    });
  });
}

export function buildLocalGuideAnswer(params: {
  question: string;
  city?: CityResult;
  weather?: WeatherSummary;
  places: WikiPlace[];
}) {
  const question = params.question.toLowerCase();
  const firstPlace = params.places[0];
  const secondPlace = params.places[1];
  const cityName = params.city?.name ?? "a tua zona";
  const weatherText = params.weather
    ? `${params.weather.label.toLowerCase()}, ${params.weather.temperature} °C`
    : "condições ainda a carregar";

  if (question.includes("café") || question.includes("cafe")) {
    return `Para uma pausa calma em ${cityName}, sugiro procurar cafés perto de ${
      firstPlace?.title ?? "um ponto central"
    }. O tempo agora está com ${weatherText}, por isso mantive a sugestão perto de zonas abrigadas.`;
  }

  if (question.includes("ritmo") || question.includes("calmo")) {
    return `Ajustei o ritmo para um percurso mais leve: começa por ${
      firstPlace?.title ?? "um ponto cultural próximo"
    }, faz uma pausa curta e segue para ${
      secondPlace?.title ?? "uma paragem próxima"
    }. Evitei saltos longos entre paragens.`;
  }

  if (question.includes("chuva") || question.includes("tempo")) {
    return `Neste momento em ${cityName}: ${weatherText}. Se a probabilidade de chuva subir, o roteiro privilegia espaços interiores e paragens curtas.`;
  }

  return `Em ${cityName}, o ponto mais interessante próximo é ${
    firstPlace?.title ?? "a zona histórica central"
  }. ${
    firstPlace?.description
      ? `É conhecido como ${firstPlace.description.toLowerCase()}.`
      : "Posso construir uma narrativa curta à medida que caminhas."
  }`;
}
