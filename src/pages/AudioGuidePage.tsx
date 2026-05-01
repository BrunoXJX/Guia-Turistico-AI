import {
  ArrowLeft,
  Bot,
  MapPinned,
  MessageCircle,
  Pause,
  Play,
  Radio,
  RotateCcw,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { audioGuideState, tours } from "../data/travelData";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
};

export default function AudioGuidePage() {
  const { tourId } = useParams();
  const tour = tours.find((item) => item.id === tourId) ?? tours[3];
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(420);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      setElapsed((current) =>
        current >= audioGuideState.durationSeconds
          ? audioGuideState.durationSeconds
          : current + 1,
      );
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isPlaying]);

  const progress = useMemo(
    () => (elapsed / audioGuideState.durationSeconds) * 100,
    [elapsed],
  );

  return (
    <div className="space-y-5">
      <Link
        to={`/tours/${tour.id}`}
        className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-extrabold text-slate shadow-ambient backdrop-blur-xl"
      >
        <ArrowLeft size={18} />
        Detalhes da tour
      </Link>

      <section
        className="relative min-h-[calc(100vh-150px)] overflow-hidden rounded-[2rem] bg-cover bg-center p-5 text-white shadow-ambient"
        style={{ backgroundImage: `url(${tour.hero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/72 to-ink/18" />
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-210px)] max-w-4xl flex-col justify-between gap-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1 text-sm font-extrabold backdrop-blur-xl">
                <Radio size={16} />
                Guia áudio em progresso
              </p>
              <h1 className="mt-5 text-4xl font-extrabold tracking-normal">
                {audioGuideState.title}
              </h1>
              <p className="mt-2 text-base font-semibold text-white/70">
                {audioGuideState.location}
              </p>
            </div>
            <button
              onClick={() => setElapsed(0)}
              className="grid h-12 w-12 place-items-center rounded-full bg-white/16 backdrop-blur-xl"
              aria-label="Reiniciar guia"
            >
              <RotateCcw size={20} />
            </button>
          </div>

            <div className="rounded-[2rem] border border-white/20 bg-white/12 p-5 backdrop-blur-2xl">
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/50">
                  Capítulo atual
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-normal">
                  {audioGuideState.currentChapter}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {[0.8, 1, 1.2].map((item) => (
                  <button
                    key={item}
                    onClick={() => setSpeed(item)}
                    className={[
                      "rounded-full px-3 py-2 text-sm font-extrabold transition",
                      speed === item ? "bg-white text-ink" : "bg-white/12",
                    ].join(" ")}
                  >
                    {item.toFixed(1)}x
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="h-2 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-orange transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-sm font-bold text-white/60">
                <span>{formatTime(elapsed)}</span>
                <span>{formatTime(audioGuideState.durationSeconds)}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => setElapsed((value) => Math.max(0, value - 15))}
                className="grid h-12 w-12 place-items-center rounded-full bg-white/14"
                aria-label="Recuar 15 segundos"
              >
                <SkipBack size={22} />
              </button>
              <button
                onClick={() => setIsPlaying((value) => !value)}
                className="grid h-20 w-20 place-items-center rounded-full bg-orange text-white shadow-glow"
                aria-label={isPlaying ? "Pausar" : "Reproduzir"}
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </button>
              <button
                onClick={() =>
                  setElapsed((value) =>
                    Math.min(audioGuideState.durationSeconds, value + 15),
                  )
                }
                className="grid h-12 w-12 place-items-center rounded-full bg-white/14"
                aria-label="Avançar 15 segundos"
              >
                <SkipForward size={22} />
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-white/20 bg-white/12 p-5 backdrop-blur-2xl">
              <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.16em] text-white/50">
                <MessageCircle size={16} />
                Transcrição viva
              </div>
              <div className="mt-4 space-y-3">
                {audioGuideState.transcript.map((line) => (
                  <p key={line} className="text-sm font-semibold leading-6 text-white/78">
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid gap-3">
              <button className="flex items-center justify-between rounded-3xl bg-white p-4 font-extrabold text-ink">
                <span className="flex items-center gap-3">
                  <Bot size={20} className="text-orange" />
                  Perguntar ao guia
                </span>
                <span>PT</span>
              </button>
              <button className="flex items-center justify-between rounded-3xl bg-white/12 p-4 font-extrabold text-white">
                <span className="flex items-center gap-3">
                  <MapPinned size={20} />
                  Próxima paragem
                </span>
                <span>120 m</span>
              </button>
              <button className="flex items-center justify-between rounded-3xl bg-white/12 p-4 font-extrabold text-white">
                <span className="flex items-center gap-3">
                  <Volume2 size={20} />
                  Som ambiente
                </span>
                <span>Ligado</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
