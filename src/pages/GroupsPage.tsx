import {
  BadgeEuro,
  BrainCircuit,
  CheckCircle2,
  HeartHandshake,
  Plus,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { groupMembers } from "../data/travelData";

export default function GroupsPage() {
  const [culture, setCulture] = useState(82);
  const [food, setFood] = useState(76);
  const [pace, setPace] = useState(68);

  const happiness = useMemo(
    () => Math.min(98, Math.round(58 + (culture + food + pace) / 7.5)),
    [culture, food, pace],
  );

  return (
    <div className="space-y-5">
      <section className="grid gap-5">
        <div className="rounded-[2rem] bg-ink p-5 text-white shadow-ambient">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/50">
            Planeamento de Grupo
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-normal">
            Consenso de Grupo
          </h1>
          <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-white/68">
            A IA combina orçamentos, interesses e ritmos para propor o plano com
            maior felicidade coletiva.
          </p>
        </div>

        <div className="rounded-[2rem] bg-orange p-5 text-white shadow-glow">
          <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.16em] text-white/70">
            <HeartHandshake size={18} />
            Índice de Felicidade
          </p>
          <p className="mt-4 text-6xl font-extrabold tracking-normal">
            {happiness}%
          </p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/25">
            <div
              className="h-full rounded-full bg-white transition-all"
              style={{ width: `${happiness}%` }}
            />
          </div>
        </div>
      </section>

      <section className="page-grid">
        <div className="glass-card rounded-[2rem] p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-orangeDeep/70">
                Harmonização
              </p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-normal">
                Preferências do Grupo
              </h2>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-extrabold text-white"
              aria-label="Gerar consenso"
            >
              <BrainCircuit size={18} />
              Gerar
            </button>
          </div>

          <div className="mt-6 grid gap-5">
            <PreferenceSlider
              label="Cultura e história"
              value={culture}
              onChange={setCulture}
            />
            <PreferenceSlider
              label="Gastronomia local"
              value={food}
              onChange={setFood}
            />
            <PreferenceSlider
              label="Ritmo calmo"
              value={pace}
              onChange={setPace}
            />
          </div>

          <div className="mt-6 rounded-3xl bg-ink p-5 text-white">
            <p className="flex items-center gap-2 font-extrabold">
              <Sparkles size={20} className="text-orange" />
              Proposta de consenso
            </p>
            <p className="mt-3 text-sm font-semibold leading-6 text-white/68">
              Manhã cultural em Belém, almoço reservado e tarde curta no MAAT.
              Mantém o orçamento médio abaixo de 95 € por pessoa.
            </p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="glass-card rounded-[2rem] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-tealDeep/70">
                  Membros
                </p>
                <h2 className="mt-1 text-2xl font-extrabold tracking-normal">
                  Preferências
                </h2>
              </div>
              <button
                className="grid h-11 w-11 place-items-center rounded-full bg-orange text-white"
                aria-label="Adicionar membro"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {groupMembers.map((member) => (
                <div key={member.name} className="rounded-3xl bg-white p-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-ink text-sm font-extrabold text-white">
                      {member.avatar}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-extrabold">{member.name}</h3>
                        <span className="text-sm font-extrabold text-orangeDeep">
                          {member.match}%
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-bold text-slate/60">
                        {member.role}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs font-extrabold text-slate/45">
                        <BadgeEuro size={14} />
                        {member.budget}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {member.interests.map((interest) => (
                      <span
                        key={interest}
                        className="rounded-full bg-cloud px-3 py-1 text-xs font-extrabold text-slate"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-ink p-5 text-white shadow-ambient">
            <p className="flex items-center gap-2 font-extrabold">
              <UsersRound size={20} className="text-orange" />
              Estado do plano
            </p>
            <div className="mt-4 space-y-3">
              {["Orçamentos compatíveis", "Ritmo equilibrado", "Reserva crítica escolhida"].map(
                (item) => (
                  <p key={item} className="flex items-center gap-3 text-sm font-bold">
                    <CheckCircle2 size={18} className="text-teal" />
                    {item}
                  </p>
                ),
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

type PreferenceSliderProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

function PreferenceSlider({ label, value, onChange }: PreferenceSliderProps) {
  return (
    <label className="block rounded-3xl bg-white p-4">
      <span className="flex items-center justify-between gap-4">
        <span className="font-extrabold">{label}</span>
        <span className="text-sm font-extrabold text-orangeDeep">{value}%</span>
      </span>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="range-control mt-4 w-full"
      />
    </label>
  );
}
