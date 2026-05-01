import { Clock3, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { Tour } from "../data/travelData";

type TourCardProps = {
  tour: Tour;
  compact?: boolean;
};

export default function TourCard({ tour, compact = false }: TourCardProps) {
  return (
    <Link
      to={`/tours/${tour.id}`}
      className={[
        "group block overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-ambient backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:shadow-glow",
        compact ? "min-w-[280px]" : "",
      ].join(" ")}
    >
      <div
        className={[
          "relative bg-cover bg-center",
          compact ? "h-44" : "h-56",
        ].join(" ")}
        style={{ backgroundImage: `url(${tour.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-extrabold text-orangeDeep backdrop-blur-xl">
          {tour.category}
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-1 text-sm font-bold">
            <MapPin size={15} />
            {tour.city}, {tour.country}
          </div>
          <h3 className="mt-1 text-xl font-extrabold tracking-normal">
            {tour.title}
          </h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate/70">
          <span className="inline-flex items-center gap-1">
            <Star size={16} className="fill-orange text-orange" />
            {tour.rating}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock3 size={16} />
            {tour.duration}
          </span>
          <span>{tour.price}</span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate/70">
          {tour.description}
        </p>
      </div>
    </Link>
  );
}
