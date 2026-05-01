import {
  ArrowLeft,
  CalendarCheck,
  Clock3,
  Headphones,
  MapPin,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import MetricCard from "../components/MetricCard";
import { tours } from "../data/travelData";

export default function TourDetailsPage() {
  const { tourId } = useParams();
  const tour = tours.find((item) => item.id === tourId) ?? tours[0];

  return (
    <div className="space-y-5">
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-extrabold text-slate shadow-ambient backdrop-blur-xl"
      >
        <ArrowLeft size={18} />
        Voltar a explorar
      </Link>

      <section className="page-grid">
        <div className="space-y-5">
          <div
            className="relative min-h-[440px] overflow-hidden rounded-[2rem] bg-cover bg-center p-5 text-white shadow-ambient"
            style={{ backgroundImage: `url(${tour.hero})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
            <div className="relative z-10 flex min-h-[420px] flex-col justify-end">
              <div className="flex flex-wrap gap-2">
                {tour.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/16 px-3 py-1 text-sm font-extrabold backdrop-blur-xl"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-normal">
                {tour.title}
              </h1>
              <p className="mt-3 flex items-center gap-2 text-base font-bold text-white/78">
                <MapPin size={18} />
                {tour.city}, {tour.country}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="Avaliação" value={`${tour.rating}`} icon={Star} />
            <MetricCard label="Duração" value={tour.duration} icon={Clock3} />
            <MetricCard label="Distância" value={tour.distance} icon={Route} />
            <MetricCard label="Preço" value={tour.price} icon={CalendarCheck} tone="orange" />
          </div>

          <section className="glass-card rounded-[2rem] p-5">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-orangeDeep/70">
              Jornada com Guia IA
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-normal">
              {tour.guideMode}
            </h2>
            <p className="mt-3 leading-7 text-slate/70">{tour.description}</p>
            <div className="mt-5 grid gap-3">
              {tour.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-3xl border border-orange/10 bg-orange/10 p-4"
                >
                  <Sparkles size={19} className="text-orange" />
                  <p className="mt-3 text-sm font-bold leading-6 text-slate">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="glass-card rounded-[2rem] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-tealDeep/70">
                  Guia Áudio
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-normal">
                  {tour.audioTitle}
                </h2>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal text-white">
                <Headphones size={22} />
              </span>
            </div>
            <p className="mt-4 text-sm font-bold leading-6 text-slate/70">
              Voz natural, capítulos curtos e respostas contextuais durante a
              caminhada.
            </p>
            <Link
              to={`/audio/${tour.id}`}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange px-5 py-4 text-base font-extrabold text-white shadow-glow"
            >
              Começar guia
              <Headphones size={19} />
            </Link>
          </div>

          <div className="glass-card rounded-[2rem] p-5">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-orangeDeep/70">
              Rota do Tour
            </p>
            <div className="mt-5 space-y-4">
              {tour.route.map((stop, index) => (
                <div key={stop} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-xs font-extrabold text-white">
                      {index + 1}
                    </span>
                    {index < tour.route.length - 1 ? (
                      <span className="h-10 w-px bg-slate/15" />
                    ) : null}
                  </div>
                  <div>
                    <p className="font-extrabold">{stop}</p>
                    <p className="text-sm font-semibold text-slate/55">
                      Paragem contextual
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-ink p-5 text-white shadow-ambient">
            <ShieldCheck size={24} className="text-orange" />
            <h3 className="mt-3 text-xl font-extrabold tracking-normal">
              {tour.slots}
            </h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/65">
              Reserva simulada para protótipo, sem pagamento ou backend.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
