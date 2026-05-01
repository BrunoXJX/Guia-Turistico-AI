import {
  BadgeCheck,
  ChevronRight,
  Clock3,
  Crown,
  Download,
  Luggage,
  MapPin,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import MetricCard from "../components/MetricCard";
import { cityPacks, profile } from "../data/travelData";

export default function ProfilePage() {
  return (
    <div className="space-y-5">
      <section className="grid gap-5">
        <div className="rounded-[2rem] bg-ink p-5 text-white shadow-ambient">
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/50">
                A Minha Conta
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-normal">
                {profile.name}
              </h1>
              <p className="mt-2 flex items-center gap-2 font-bold text-white/70">
                <MapPin size={18} />
                {profile.city}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-orange px-4 py-2 text-sm font-extrabold">
              <Crown size={17} />
              {profile.premiumStatus}
            </span>
          </div>
        </div>

        <div className="glass-card rounded-[2rem] p-5">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-orangeDeep/70">
            Nível
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-normal">
            {profile.level}
          </h2>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate/10">
            <div className="h-full w-[78%] rounded-full bg-orange" />
          </div>
          <p className="mt-3 text-sm font-bold text-slate/60">
            620 XP até ao próximo estatuto
          </p>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          label="Tours concluídas"
          value={`${profile.completedTours}`}
          icon={Trophy}
          tone="orange"
        />
        <MetricCard
          label="Horas poupadas"
          value={`${profile.savedHours}h`}
          icon={Clock3}
        />
        <MetricCard label="Selos digitais" value="16" icon={BadgeCheck} />
        <MetricCard label="Packs ativos" value="2" icon={Luggage} tone="dark" />
      </div>

      <section className="page-grid">
        <div className="glass-card rounded-[2rem] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-orangeDeep/70">
                Luggage
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-normal">
                Os Meus Packs
              </h2>
            </div>
            <button
              className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white"
              aria-label="Transferir packs"
            >
              <Download size={19} />
            </button>
          </div>
          <div className="mt-5 grid gap-4">
            {cityPacks.map((pack) => (
              <div
                key={pack.id}
                className="grid gap-4 rounded-3xl border border-slate/10 bg-white p-3"
              >
                <div
                  className="h-28 rounded-2xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${pack.image})` }}
                />
                <div className="py-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-extrabold">{pack.city}</h3>
                    <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-extrabold text-orangeDeep">
                      {pack.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-slate/60">
                    {pack.tours} experiências disponíveis
                  </p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate/10">
                    <div
                      className="h-full rounded-full bg-orange"
                      style={{ width: `${pack.progress}%` }}
                    />
                  </div>
                </div>
                <Link
                  to="/"
                  className="grid h-12 w-12 place-items-center self-center rounded-full bg-cloud text-ink"
                  aria-label={`Abrir pack ${pack.city}`}
                >
                  <ChevronRight size={20} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] bg-ink p-5 text-white shadow-ambient">
          <Crown size={28} className="text-orange" />
          <h2 className="mt-4 text-2xl font-extrabold tracking-normal">
            Subscrição Premium
          </h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-white/68">
            Packs offline, guia de voz, pivôs de itinerário e passaporte
            digital num único espaço.
          </p>
          <div className="mt-5 space-y-3">
            {["Guia áudio ilimitado", "Itinerários adaptativos", "Selos colecionáveis"].map(
              (item) => (
                <p key={item} className="flex items-center gap-3 font-bold">
                  <BadgeCheck size={18} className="text-orange" />
                  {item}
                </p>
              ),
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}
