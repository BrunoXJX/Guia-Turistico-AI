import {
  Bot,
  Loader2,
  Mic,
  MicOff,
  Navigation,
  Send,
  Sparkles,
  Volume2,
} from "lucide-react";
import { useState } from "react";
import { tours } from "../data/travelData";
import { useTravelContext } from "../hooks/useTravelContext";
import { askOpenAiGuide } from "../services/openAiGuide";
import { buildLocalGuideAnswer } from "../services/travelApis";

const prompts = [
  "Qual é a história deste bairro?",
  "Onde encontro um café sossegado?",
  "Muda o ritmo para algo mais calmo.",
];

type BrowserSpeechRecognition = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
};

type BrowserSpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

type SpeechRecognitionResultEvent = {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
};

function speak(text: string) {
  if (!window.speechSynthesis) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-PT";
  utterance.rate = 0.96;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

export default function VoicePage() {
  const { city, weather, places, loading, status } = useTravelContext();
  const [listening, setListening] = useState(false);
  const [activePrompt, setActivePrompt] = useState(prompts[0]);
  const [answer, setAnswer] = useState(
    "Pergunta-me algo sobre a zona, o clima ou o melhor ritmo para a tua rota.",
  );
  const [answerSource, setAnswerSource] = useState<"openai" | "local">("local");
  const [asking, setAsking] = useState(false);

  const askGuide = async (question = activePrompt) => {
    const cleanQuestion = question.trim();

    if (!cleanQuestion) {
      return;
    }

    setAsking(true);
    setActivePrompt(cleanQuestion);

    try {
      const openAiAnswer = await askOpenAiGuide({
        question: cleanQuestion,
        city,
        weather,
        places,
      });

      if (openAiAnswer) {
        setAnswer(openAiAnswer.answer);
        setAnswerSource("openai");
        speak(openAiAnswer.answer);
        return;
      }

      const localAnswer = buildLocalGuideAnswer({
        question: cleanQuestion,
        city,
        weather: weather ?? undefined,
        places,
      });

      setAnswer(localAnswer);
      setAnswerSource("local");
      speak(localAnswer);
    } finally {
      setAsking(false);
    }
  };

  const startVoiceInput = () => {
    const SpeechRecognition =
      (window as unknown as {
        SpeechRecognition?: BrowserSpeechRecognitionConstructor;
      }).SpeechRecognition ??
      (window as unknown as {
        webkitSpeechRecognition?: BrowserSpeechRecognitionConstructor;
      }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      void askGuide(activePrompt);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "pt-PT";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setListening(true);

    recognition.onresult = (event: SpeechRecognitionResultEvent) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) {
        void askGuide(transcript);
      }
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.start();
  };

  return (
    <div className="page-grid">
      <section
        className="relative min-h-[680px] overflow-hidden rounded-[2rem] bg-cover bg-center p-5 text-white shadow-ambient"
        style={{ backgroundImage: `url(${tours[0].hero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/76 to-ink" />
        <div className="relative z-10 flex min-h-[620px] flex-col items-center justify-between text-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1 text-sm font-extrabold backdrop-blur-xl">
              <Bot size={16} />
              Companheiro de Voz IA
            </p>
            <h1 className="mt-8 text-4xl font-extrabold tracking-normal">
              {listening ? "Estou a ouvir..." : "Voz em pausa"}
            </h1>
            <p className="mt-3 max-w-md text-base font-semibold leading-7 text-white/68">
              O guia mantém contexto da localização, clima e preferências da
              viagem.
            </p>
          </div>

          <button
            onClick={startVoiceInput}
            className={[
              "grid h-44 w-44 place-items-center rounded-full border border-white/20 shadow-glow transition",
              listening || asking ? "animate-pulse bg-orange" : "bg-white/16",
            ].join(" ")}
            aria-label="Ativar voz"
          >
            {asking ? (
              <Loader2 size={64} className="animate-spin" />
            ) : listening ? (
              <Mic size={64} />
            ) : (
              <MicOff size={64} />
            )}
          </button>

          <div className="w-full rounded-[2rem] border border-white/20 bg-white/12 p-4 text-left backdrop-blur-2xl">
            <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.16em] text-white/50">
              <Sparkles size={16} />
              {answerSource === "openai" ? "Resposta OpenAI" : "Resposta local"}
            </p>
            <p className="mt-3 text-lg font-bold leading-8">
              {answer}
            </p>
          </div>
        </div>
      </section>

      <aside className="space-y-4">
        <div className="glass-card rounded-[2rem] p-5">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-orangeDeep/70">
            Perguntas rápidas
          </p>
          <div className="mt-4 grid gap-3">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => void askGuide(prompt)}
                className={[
                  "rounded-3xl p-4 text-left text-sm font-extrabold leading-6 transition",
                  activePrompt === prompt
                    ? "bg-ink text-white"
                    : "bg-white text-slate shadow-ambient",
                ].join(" ")}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-ink p-5 text-white shadow-ambient">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/50">
            Contexto ativo
          </p>
          <div className="mt-5 grid gap-3">
            <div className="flex items-center justify-between rounded-3xl bg-white/10 p-4">
              <span className="flex items-center gap-3 font-bold">
                <Navigation size={19} className="text-orange" />
                {loading ? "A carregar" : places[0]?.title ?? "Sem paragem"}
              </span>
              <span className="text-sm font-extrabold text-white/60">
                {places[0] ? `${Math.round(places[0].distanceMeters)} m` : "--"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-3xl bg-white/10 p-4">
              <span className="flex items-center gap-3 font-bold">
                <Volume2 size={19} className="text-teal" />
                {weather?.label ?? status}
              </span>
              <span className="text-sm font-extrabold text-white/60">
                {weather ? `${weather.temperature} °C` : city.name}
              </span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-[2rem] p-3">
          <label className="flex min-h-14 items-center gap-3 rounded-full bg-white px-4">
            <input
              value={activePrompt}
              onChange={(event) => setActivePrompt(event.target.value)}
              className="min-w-0 flex-1 border-0 bg-transparent text-sm font-bold text-ink focus:ring-0"
            />
            <button
              onClick={() => void askGuide(activePrompt)}
              disabled={asking || activePrompt.trim().length < 2}
              className="grid h-10 w-10 place-items-center rounded-full bg-orange text-white"
              aria-label="Enviar pergunta"
            >
              <Send size={18} />
            </button>
          </label>
        </div>
      </aside>
    </div>
  );
}
