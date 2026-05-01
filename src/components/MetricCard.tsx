import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  tone?: "dark" | "light" | "orange" | "teal";
};

const toneClass = {
  dark: "bg-ink text-white",
  light: "bg-white/80 text-ink",
  orange: "bg-orange text-white",
  teal: "bg-teal text-white",
};

export default function MetricCard({
  label,
  value,
  icon: Icon,
  tone = "light",
}: MetricCardProps) {
  return (
    <div
      className={[
        "rounded-3xl border border-white/70 p-4 shadow-ambient backdrop-blur-2xl",
        toneClass[tone],
      ].join(" ")}
    >
      <Icon size={22} />
      <p className="mt-4 text-2xl font-extrabold tracking-normal">{value}</p>
      <p className="mt-1 text-sm font-bold opacity-70">{label}</p>
    </div>
  );
}
