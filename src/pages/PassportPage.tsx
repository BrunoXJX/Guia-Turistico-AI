import {
  Aperture,
  BadgeCheck,
  Camera,
  Crown,
  Map,
  Medal,
  ScanLine,
  Sparkles,
} from "lucide-react";
import MetricCard from "../components/MetricCard";
import { passportStamps } from "../data/travelData";

const rarityClasses = {
  Comum: "bg-slate/10 text-slate",
  Raro: "bg-teal/10 text-tealDeep",
  Épico: "bg-orange/10 text-orangeDeep",
};

export default function PassportPage() {
  return (
    <div className="space-y-5">
      <section className="grid gap-5">
        <div className="rounded-[2rem] bg-ink p-5 text-white shadow-ambient">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/50">
            Passaporte Digital
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-normal">
            O Teu Registo.
          </h1>
          <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/68">
            Tours concluídas, selos colecionáveis e desafios AR no mesmo
            passaporte de exploração.
          </p>
        </div>

        <div className="glass-card rounded-[2rem] p-5">
          <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.16em] text-orangeDeep/70">
            <Crown size={18} />
            Explorador de Elite
          </p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate/10">
            <div className="h-full w-[82%] rounded-full bg-orange" />
          </div>
          <p className="mt-3 text-sm font-bold text-slate/60">
            82% da temporada atual concluída
          </p>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <MetricCard label="Selos" value="16" icon={Medal} tone="orange" />
        <MetricCard label="Cidades" value="7" icon={Map} />
        <MetricCard label="Raros" value="5" icon={BadgeCheck} />
        <MetricCard label="Desafios AR" value="3" icon={ScanLine} tone="dark" />
      </div>

      <section className="page-grid">
        <div className="glass-card rounded-[2rem] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-tealDeep/70">
                Selos Colecionados
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-normal">
                O Meu Passaporte
              </h2>
            </div>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white">
              <Aperture size={20} />
            </span>
          </div>

          <div className="mt-5 grid gap-4">
            {passportStamps.map((stamp) => (
              <article
                key={stamp.id}
                className="overflow-hidden rounded-3xl border border-slate/10 bg-white"
              >
                <div
                  className="h-44 bg-cover bg-center"
                  style={{ backgroundImage: `url(${stamp.image})` }}
                />
                <div className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-extrabold text-slate/50">
                      {stamp.city}
                    </p>
                    <span
                      className={[
                        "rounded-full px-3 py-1 text-xs font-extrabold",
                        rarityClasses[stamp.rarity],
                      ].join(" ")}
                    >
                      {stamp.rarity}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-extrabold tracking-normal">
                    {stamp.title}
                  </h3>
                  <p className="mt-2 text-sm font-bold text-slate/55">
                    {stamp.date}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[2rem] bg-ink p-5 text-white shadow-ambient">
            <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.16em] text-white/50">
              <Sparkles size={16} />
              Caça ao Tesouro AR
            </p>
            <h2 className="mt-4 text-2xl font-extrabold tracking-normal">
              Os Segredos de Alfama
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-white/68">
              4 pistas ativas perto de miradouros, becos e azulejos históricos.
            </p>
            <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange px-5 py-4 text-base font-extrabold text-white shadow-glow">
              <Camera size={19} />
              Abrir desafio
            </button>
          </div>

          <div className="glass-card rounded-[2rem] p-5">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-orangeDeep/70">
              Progresso semanal
            </p>
            <div className="mt-5 space-y-4">
              {[
                ["Tours áudio", 80],
                ["Pistas AR", 45],
                ["Cidades novas", 60],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <div className="flex justify-between text-sm font-extrabold">
                    <span>{label}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate/10">
                    <div
                      className="h-full rounded-full bg-orange"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
