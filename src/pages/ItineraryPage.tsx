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

const statusClasses = {
  confirmado: "bg-teal/10 text-tealDeep",
  ajustado: "bg-orange/10 text-orangeDeep",
  sugerido: "bg-ink/10 text-ink",
};

export default function ItineraryPage() {
  const [pivotApplied, setPivotApplied] = useState(true);

  return (
    <div className="space-y-5">
      <section className="grid gap-5">
        <div className="rounded-[2rem] bg-ink p-5 text-white shadow-ambient">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/50">
            O Seu Roteiro
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-normal">
            Lisboa: Dia 2
          </h1>
          <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/68">
            Um dia em Belém ajustado ao clima, energia do grupo e reservas
            disponíveis.
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
            Chuva prevista às 13:00. A IA deslocou o almoço e sugeriu uma
            paragem interior no MAAT.
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
                        ? stop.note
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
                  Manhã
                </span>
                <span className="font-extrabold">21 °C</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-white/10 p-4">
                <span className="flex items-center gap-3 font-bold">
                  <CloudRain size={20} className="text-teal" />
                  Almoço
                </span>
                <span className="font-extrabold">Chuva</span>
              </div>
              <div className="flex items-center justify-between rounded-3xl bg-white/10 p-4">
                <span className="flex items-center gap-3 font-bold">
                  <Coffee size={20} className="text-orange" />
                  Energia
                </span>
                <span className="font-extrabold">Média</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[2rem] p-5">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-orangeDeep/70">
              Mapa simulado
            </p>
            <div className="mt-4 h-72 rounded-3xl bg-cloud p-4">
              <div className="relative h-full overflow-hidden rounded-2xl bg-white">
                <div className="absolute inset-x-8 top-10 h-1 rounded-full bg-orange/70" />
                <div className="absolute bottom-10 left-10 right-12 h-1 rotate-[-18deg] rounded-full bg-teal/70" />
                {[20, 48, 76].map((left, index) => (
                  <span
                    key={left}
                    className="absolute grid h-10 w-10 place-items-center rounded-full bg-ink text-sm font-extrabold text-white shadow-glow"
                    style={{ left: `${left}%`, top: `${28 + index * 18}%` }}
                  >
                    {index + 1}
                  </span>
                ))}
                <MapPinned className="absolute bottom-5 right-5 text-orange" size={32} />
              </div>
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
