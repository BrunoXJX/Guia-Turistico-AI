import {
  CalendarDays,
  CloudRain,
  Coffee,
  MapPinned,
  RefreshCw,
  Sparkles,
  Sun,
} from "lucide-react";
import { useState } from "react";
import { itineraryStops } from "../data/travelData";
import { useTravelContext } from "../hooks/useTravelContext";

const statusClasses = {
  confirmado: "bg-teal/10 text-tealDeep",
  ajustado: "bg-orange/10 text-orangeDeep",
  sugerido: "bg-ink/10 text-ink",
};

export default function ItineraryPage() {
  const { city, weather, places, status } = useTravelContext();
  const [pivotApplied, setPivotApplied] = useState(true);
  const rainRisk = weather ? weather.rainProbability > 40 || weather.precipitation > 0 : true;

  return (
    <div className="space-y-5">
      <section className="grid gap-5">
        <div className="rounded-[2rem] bg-ink p-5 text-white shadow-ambient">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/50">
            O Seu Roteiro
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-normal">
            {city.name}: Dia 2
          </h1>
          <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/68">
            Roteiro ajustado com clima real, locais próximos e energia do
            grupo.
          </p>
        </div>

        <div className="glass-card rounded-[2rem] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-orangeDeep/70">
                Ajuste Inteligente
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-normal">
                {pivotApplied ? "Aplicado" : "Disponível"}
              </h2>
            </div>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange text-white">
              <CloudRain size={22} />
            </span>
          </div>
          <p className="mt-4 text-sm font-bold leading-6 text-slate/65">
            {weather
              ? `${weather.label}, ${weather.temperature} °C. ${
                  rainRisk
                    ? "A IA privilegiou pausas abrigadas e paragens interiores."
                    : "A IA manteve o percurso exterior com pausas curtas."
                }`
              : status}
          </p>
          <button
            onClick={() => setPivotApplied((value) => !value)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 text-base font-extrabold text-white"
          >
            <RefreshCw size={18} />
            {pivotApplied ? "Comparar plano original" : "Aplicar pivô"}
          </button>
        </div>
      </section>

      <section className="page-grid">
        <div className="glass-card rounded-[2rem] p-5">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-tealDeep/70">
                Timeline
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-normal">
                Plano do dia
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-orange/10 px-4 py-2 text-sm font-extrabold text-orangeDeep">
              <Sparkles size={16} />
              {pivotApplied ? "Otimizado" : "Original"}
            </span>
          </div>

          <div className="mt-6 space-y-5">
            {itineraryStops.map((stop, index) => (
              <div key={stop.title} className="grid gap-4">
                <div className="flex">
                  <p className="text-lg font-extrabold">{stop.time}</p>
                </div>
                <div className="grid gap-4 rounded-3xl border border-slate/10 bg-white p-3">
                  <div
                    className="h-32 rounded-2xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${stop.image})` }}
                  />
                  <div className="py-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-extrabold">{stop.title}</h3>
                      <span
                        className={[
                          "rounded-full px-3 py-1 text-xs font-extrabold",
                          statusClasses[stop.status],
                        ].join(" ")}
                      >
                        {stop.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-bold text-slate/55">
                      {stop.type} · {stop.duration}
                    </p>
                    <p className="mt-3 text-sm font-semibold leading-6 text-slate/65">
                      {pivotApplied
                        ? index < places.length
                          ? `${stop.note} Perto daqui: ${places[index].title}.`
                          : stop.note
                        : index === 1
                          ? "Horário original com maior risco de chuva no trajeto."
                          : stop.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[2rem] bg-ink p-5 text-white shadow-ambient">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/50">
              Condições
            </p>
            <div className="mt-5 grid gap-3">
              <div className="flex items-center justify-between rounded-3xl bg-white/10 p-4">
                <span className="flex items-center gap-3 font-bold">
                  <Sun size={20} className="text-orange" />
                  Agora
                </span>
                <span className="font-extrabold">
                  {weather ? `${weather.temperature} °C` : "--"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-white/10 p-4">
                <span className="flex items-center gap-3 font-bold">
                  <CloudRain size={20} className="text-teal" />
                  Chuva
                </span>
                <span className="font-extrabold">
                  {weather ? `${weather.rainProbability}%` : "--"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-white/10 p-4">
                <span className="flex items-center gap-3 font-bold">
                  <Coffee size={20} className="text-orange" />
                  Vento
                </span>
                <span className="font-extrabold">
                  {weather ? `${weather.windSpeed} km/h` : "--"}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[2rem] p-5">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-orangeDeep/70">
              Locais próximos
            </p>
            <div className="mt-4 grid gap-3">
              {places.slice(0, 3).map((place, index) => (
                <a
                  key={place.pageId}
                  href={place.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-3xl bg-white p-3"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-sm font-extrabold text-white">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-extrabold">
                      {place.title}
                    </span>
                    <span className="text-sm font-bold text-slate/55">
                      {Math.round(place.distanceMeters)} m
                    </span>
                  </span>
                  <MapPinned className="text-orange" size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[2rem] p-5">
            <p className="flex items-center gap-2 font-extrabold">
              <CalendarDays size={20} className="text-orange" />
              Próxima reserva
            </p>
            <p className="mt-2 text-sm font-semibold text-slate/60">
              Prado Restaurante · 12:15 · mesa para 3
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
