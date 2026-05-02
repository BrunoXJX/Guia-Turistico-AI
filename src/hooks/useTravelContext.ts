import { useCallback, useEffect, useState } from "react";
import {
  CityResult,
  getBrowserLocation,
  getNearbyWikiPlaces,
  getWeather,
  searchCities,
  WeatherSummary,
  WikiPlace,
} from "../services/travelApis";

const fallbackCity: CityResult = {
  id: 2267057,
  name: "Lisboa",
  country: "Portugal",
  latitude: 38.71667,
  longitude: -9.13333,
  timezone: "Europe/Lisbon",
  admin1: "Lisboa",
};

export function useTravelContext() {
  const [city, setCity] = useState<CityResult>(fallbackCity);
  const [weather, setWeather] = useState<WeatherSummary | null>(null);
  const [places, setPlaces] = useState<WikiPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("A carregar contexto real...");
  const [error, setError] = useState<string | null>(null);

  const loadForCity = useCallback(async (nextCity: CityResult) => {
    setLoading(true);
    setError(null);
    setCity(nextCity);
    setStatus(`A procurar contexto em ${nextCity.name}...`);

    const [weatherResult, placesResult] = await Promise.allSettled([
      getWeather(nextCity.latitude, nextCity.longitude),
      getNearbyWikiPlaces(nextCity.latitude, nextCity.longitude),
    ]);

    if (weatherResult.status === "fulfilled") {
      setWeather(weatherResult.value);
    } else {
      setWeather(null);
    }

    if (placesResult.status === "fulfilled") {
      setPlaces(placesResult.value);
    } else {
      setPlaces([]);
    }

    if (
      weatherResult.status === "fulfilled" ||
      placesResult.status === "fulfilled"
    ) {
      setStatus(`${nextCity.name} atualizado com dados reais`);
    } else {
      setError("Não foi possível carregar dados reais agora");
      setStatus("A usar dados locais temporariamente");
    }

    setLoading(false);
  }, []);

  const searchAndLoadCity = useCallback(
    async (query: string) => {
      const results = await searchCities(query);
      const nextCity = results[0];

      if (!nextCity) {
        throw new Error("Não encontrei essa cidade");
      }

      await loadForCity(nextCity);
      return nextCity;
    },
    [loadForCity],
  );

  const useCurrentLocation = useCallback(async () => {
    setLoading(true);
    setStatus("A pedir localização ao browser...");

    const position = await getBrowserLocation();
    const nextCity: CityResult = {
      id: Date.now(),
      name: "Perto de mim",
      country: "Localização atual",
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    await loadForCity(nextCity);
    return nextCity;
  }, [loadForCity]);

  useEffect(() => {
    void loadForCity(fallbackCity);
  }, [loadForCity]);

  return {
    city,
    weather,
    places,
    loading,
    status,
    error,
    loadForCity,
    searchAndLoadCity,
    useCurrentLocation,
  };
}
