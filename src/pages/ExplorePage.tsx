import {
  ArrowRight,
  Bot,
  CalendarClock,
  Headphones,
  LocateFixed,
  Medal,
  Search,
  SlidersHorizontal,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MetricCard from "../components/MetricCard";
import TourCard from "../components/TourCard";
import { tours } from "../data/travelData";

const categories = ["Todos", "Destaques", "Perto de ti", "Áudio IA", "História"];

const smartTools = [
  {
    title: "Companheiro de Voz IA",
    label: "Pergunta ao guia",
    to: "/voz",
    icon: Bot,
  },
  {
    title: "Itinerário Inteligente",
    label: "Ajuste por clima",
    to: "/itinerario",
    icon: CalendarClock,
  },
  {
    title: "Consenso de Grupo",
    label: "Viajar sem atrito",
    to: "/grupos",
    icon: UsersRound,
  },
  {
    title: "Passaporte Digital",
    label: "Selos e desafios",
    to: "/passaporte",
    icon: Medal,
  },
];

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const matchesCategory = category === "Todos" || tour.category === category;
      const text = `${tour.title} ${tour.city} ${tour.country} ${tour.tags.join(
        " ",
      )}`.toLowerCase();
      return matchesCategory && text.includes(query.toLowerCase());
    });
  }, [category, query]);

  const featured = tours.slice(0, 3);

  return (
    <div className="space-y-6">
      <section
        className="relative overflow-hidden rounded-[2rem] bg-cover bg-center p-5 text-white shadow-ambient"
        style={{ backgroundImage: `url(${tours[2].hero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-ink/90 via-ink/55 to-orangeDeep/30" />
        <div className="relative z-10 flex min-h-[360px] flex-col justify-between gap-8">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-extrabold backdrop-blur-xl">
              <Sparkles size={16} />
              Exploração inteligente em tempo real
            </p>
            <h1 className="mt-5 max-w-xl text-4xl font-extrabold tracking-normal">
              Descobrir Tours
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/78">
              Tours com guia áudio, pivôs automáticos e recomendações que se
              adaptam ao teu ritmo.
            </p>
          </div>

          <div className="grid gap-3">
            <label className="flex min-h-14 min-w-0 items-center gap-3 rounded-full border border-white/30 bg-white/18 px-4 backdrop-blur-2xl">
              <Search size={20} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 border-0 bg-transparent text-base font-semibold text-white placeholder:text-white/60 focus:ring-0"
                placeholder="Pesquisar tours ou cidades"
              />
            </label>
            <Link
              to="/itinerario"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-orange px-6 text-base font-extrabold text-white shadow-glow"
            >
              <LocateFixed size={19} />
              Perto de mim
            </Link>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <MetricCard label="Tours curados" value="64" icon={Headphones} />
        <MetricCard label="Cidades ativas" value="18" icon={LocateFixed} />
        <MetricCard label="Pivôs IA" value="12" icon={Sparkles} tone="orange" />
        <MetricCard
          label="Grupos felizes"
          value="91%"
          icon={UsersRound}
          tone="dark"
        />
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-orangeDeep/70">
              Curadoria VOYAGE
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-normal">
              Experiências em Destaque
            </h2>
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={[
                  "whitespace-nowrap rounded-full px-4 py-2 text-sm font-extrabold transition",
                  category === item
                    ? "bg-ink text-white"
                    : "bg-white/80 text-slate/70 shadow-ambient backdrop-blur-xl",
                ].join(" ")}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
          {(filteredTours.length ? filteredTours : featured)
            .slice(0, 3)
            .map((tour) => (
              <TourCard key={tour.id} tour={tour} compact />
            ))}
        </div>
      </section>

      <section className="page-grid">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-tealDeep/70">
                Próximas escolhas
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-normal">
                Perto de ti
              </h2>
            </div>
            <button
              className="grid h-12 w-12 place-items-center rounded-full bg-white/85 text-slate shadow-ambient backdrop-blur-xl"
              aria-label="Abrir filtros"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
          <div className="grid gap-4">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-white/70 bg-ink p-5 text-white shadow-ambient">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/50">
            Action hub
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-normal">
            Ferramentas inteligentes
          </h2>
          <div className="mt-5 grid gap-3">
            {smartTools.map(({ icon: Icon, ...tool }) => (
              <Link
                key={tool.to}
                to={tool.to}
                className="group flex items-center justify-between rounded-3xl bg-white/10 p-4 transition hover:bg-white/16"
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-ink">
                    <Icon size={20} />
                  </span>
                  <span>
                    <span className="block font-extrabold">{tool.title}</span>
                    <span className="text-sm font-semibold text-white/60">
                      {tool.label}
                    </span>
                  </span>
                </span>
                <ArrowRight
                  size={19}
                  className="transition group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
