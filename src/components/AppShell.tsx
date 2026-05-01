import {
  Bot,
  Compass,
  Map,
  Medal,
  Plane,
  UserRound,
} from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { profile } from "../data/travelData";

const navItems = [
  { label: "Explorar", to: "/", icon: Compass, end: true },
  { label: "Roteiro", to: "/itinerario", icon: Map },
  { label: "Voz", to: "/voz", icon: Bot },
  { label: "Selos", to: "/passaporte", icon: Medal },
  { label: "Perfil", to: "/perfil", icon: UserRound },
];

export default function AppShell() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate/10 text-ink">
      <div className="mx-auto min-h-screen w-screen max-w-[430px] overflow-x-hidden bg-premium-radial shadow-ambient">
        <main className="min-h-screen pb-36">
          <div className="px-4 py-4">
            <header className="sticky top-0 z-30 -mx-4 mb-4 flex items-center justify-between border-b border-white/60 bg-white/72 px-4 py-3 backdrop-blur-2xl">
              <Link to="/" className="flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ink text-white">
                  <Plane size={20} />
                </span>
                <span className="text-lg font-extrabold">VOYAGE AI</span>
              </Link>
              <Link
                to="/perfil"
                className="block h-10 w-10 overflow-hidden rounded-full bg-white shadow-ambient ring-2 ring-white"
                aria-label="Abrir perfil"
              >
                <img
                  src={profile.avatarImage}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              </Link>
            </header>
            <Outlet />
          </div>
        </main>
      </div>

      <nav className="mobile-nav fixed left-1/2 z-40 w-[calc(100vw_-_24px)] max-w-[406px] -translate-x-1/2 rounded-3xl border border-white/70 bg-white/[0.92] px-2 py-2 shadow-ambient backdrop-blur-2xl">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map(({ icon: Icon, ...item }) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  "flex min-h-14 flex-col items-center justify-center rounded-2xl text-[11px] font-extrabold transition",
                  isActive ? "bg-ink text-white" : "text-slate/70",
                ].join(" ")
              }
            >
              <Icon size={19} />
              <span className="mt-1 leading-none">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
