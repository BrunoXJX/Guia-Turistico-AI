export type Tour = {
  id: string;
  title: string;
  city: string;
  country: string;
  category: string;
  duration: string;
  distance: string;
  rating: number;
  price: string;
  image: string;
  hero: string;
  description: string;
  tags: string[];
  highlights: string[];
  route: string[];
  audioTitle: string;
  guideMode: string;
  slots: string;
};

export type CityPack = {
  id: string;
  city: string;
  status: "Ativo" | "Bloqueado" | "Concluído";
  progress: number;
  tours: number;
  image: string;
};

export type ItineraryStop = {
  time: string;
  title: string;
  type: string;
  duration: string;
  status: "confirmado" | "ajustado" | "sugerido";
  image: string;
  note: string;
};

export type PassportStamp = {
  id: string;
  city: string;
  title: string;
  rarity: "Comum" | "Raro" | "Épico";
  date: string;
  image: string;
};

export type GroupMember = {
  name: string;
  role: string;
  budget: string;
  match: number;
  avatar: string;
  interests: string[];
};

export type AudioGuideState = {
  title: string;
  location: string;
  durationSeconds: number;
  currentChapter: string;
  transcript: string[];
};

const asset = (index: number) =>
  `${import.meta.env.BASE_URL}assets/travelai-${String(index).padStart(
    2,
    "0",
  )}.jpg`;

const namedAsset = (fileName: string) =>
  `${import.meta.env.BASE_URL}assets/${fileName}`;

export const tours: Tour[] = [
  {
    id: "vilnius-segredos",
    title: "Segredos de Vilnius",
    city: "Vilnius",
    country: "Lituânia",
    category: "História",
    duration: "2h 15",
    distance: "3,8 km",
    rating: 4.9,
    price: "24 €",
    image: asset(10),
    hero: asset(2),
    description:
      "Uma caminhada áudio-guiada pela cidade velha, com narrativas adaptativas sobre becos medievais, pátios escondidos e lendas locais.",
    tags: ["Guia IA", "Cidade Velha", "Offline"],
    highlights: [
      "Histórias contextuais junto à Universidade de Vilnius",
      "Paragens curtas em pátios e igrejas barrocas",
      "Recomendações de cafés tranquilos no fim da rota",
    ],
    route: ["Porta da Aurora", "Universidade", "Rua Literatų", "Catedral"],
    audioTitle: "Jornada com Guia IA",
    guideMode: "Narrativa adaptativa",
    slots: "6 horários hoje",
  },
  {
    id: "coliseu-subterraneo",
    title: "Coliseu Subterrâneo Exclusivo",
    city: "Roma",
    country: "Itália",
    category: "Destaques",
    duration: "3h 00",
    distance: "2,1 km",
    rating: 4.8,
    price: "68 €",
    image: asset(3),
    hero: asset(3),
    description:
      "Acesso curado aos corredores subterrâneos do Coliseu com contexto histórico, pausas inteligentes e rota pós-tour pelo Fórum Romano.",
    tags: ["Premium", "Bilhete incluído", "História"],
    highlights: [
      "Entrada programada com baixa fricção",
      "Camadas de contexto para adultos e crianças",
      "Sugestão automática para almoço nas proximidades",
    ],
    route: ["Coliseu", "Hipogeu", "Arco de Tito", "Fórum Romano"],
    audioTitle: "Roma sob a arena",
    guideMode: "Contexto histórico",
    slots: "Últimos 3 lugares",
  },
  {
    id: "lisboa-tejo",
    title: "Passeio de Barco ao Pôr do Sol",
    city: "Lisboa",
    country: "Portugal",
    category: "Perto de ti",
    duration: "1h 45",
    distance: "7,4 km",
    rating: 4.7,
    price: "36 €",
    image: asset(12),
    hero: asset(4),
    description:
      "Um roteiro calmo pelo Tejo com áudio leve, pontos de fotografia e recomendações para jantar depois do desembarque.",
    tags: ["Romântico", "Tejo", "Fotografia"],
    highlights: [
      "Melhor janela de luz calculada para hoje",
      "Mini-guia sobre Belém e Ponte 25 de Abril",
      "Plano alternativo se o vento subir",
    ],
    route: ["Doca de Belém", "MAAT", "Ponte 25 de Abril", "Terreiro do Paço"],
    audioTitle: "Lisboa vista do rio",
    guideMode: "Modo paisagem",
    slots: "Partida às 19:20",
  },
  {
    id: "kyoto-filosofo",
    title: "Caminho do Filósofo",
    city: "Kyoto",
    country: "Japão",
    category: "Áudio IA",
    duration: "2h 30",
    distance: "4,2 km",
    rating: 4.9,
    price: "19 €",
    image: asset(2),
    hero: asset(8),
    description:
      "Uma experiência imersiva junto ao canal de Higashiyama, alternando história, contemplação e perguntas abertas ao companheiro de voz.",
    tags: ["Zen", "Áudio", "Cultura"],
    highlights: [
      "Ritmo de caminhada ajustado ao utilizador",
      "Capítulos curtos sobre templos e jardins",
      "Momentos de silêncio guiado entre paragens",
    ],
    route: ["Ginkaku-ji", "Canal", "Hōnen-in", "Nanzen-ji"],
    audioTitle: "O som da primavera",
    guideMode: "Imersivo",
    slots: "Sempre disponível",
  },
];

export const cityPacks: CityPack[] = [
  {
    id: "lisboa",
    city: "Lisboa",
    status: "Ativo",
    progress: 72,
    tours: 12,
    image: asset(12),
  },
  {
    id: "vilnius",
    city: "Vilnius",
    status: "Concluído",
    progress: 100,
    tours: 8,
    image: asset(10),
  },
  {
    id: "roma",
    city: "Roma",
    status: "Bloqueado",
    progress: 18,
    tours: 15,
    image: asset(3),
  },
];

export const itineraryStops: ItineraryStop[] = [
  {
    time: "09:30",
    title: "Mosteiro dos Jerónimos",
    type: "Cultura",
    duration: "75 min",
    status: "confirmado",
    image: asset(15),
    note: "Chegada antes da fila maior e áudio contextual no claustro.",
  },
  {
    time: "12:15",
    title: "Prado Restaurante",
    type: "Gastronomia",
    duration: "90 min",
    status: "ajustado",
    image: asset(16),
    note: "Reserva sugerida para evitar a chuva prevista às 13:00.",
  },
  {
    time: "15:00",
    title: "MAAT",
    type: "Arte",
    duration: "80 min",
    status: "sugerido",
    image: asset(11),
    note: "Troca inteligente por uma opção interior sem perder a zona de Belém.",
  },
];

export const passportStamps: PassportStamp[] = [
  {
    id: "alfama",
    city: "Lisboa",
    title: "Os Segredos de Alfama",
    rarity: "Épico",
    date: "Abr 2026",
    image: asset(15),
  },
  {
    id: "douro",
    city: "Porto",
    title: "O Tesouro do Douro",
    rarity: "Raro",
    date: "Mar 2026",
    image: asset(16),
  },
  {
    id: "vilnius",
    city: "Vilnius",
    title: "Cidade Velha Revelada",
    rarity: "Raro",
    date: "Fev 2026",
    image: asset(10),
  },
  {
    id: "kyoto",
    city: "Kyoto",
    title: "Primavera Silenciosa",
    rarity: "Comum",
    date: "Jan 2026",
    image: asset(2),
  },
];

export const groupMembers: GroupMember[] = [
  {
    name: "Ana",
    role: "Cultura e museus",
    budget: "Até 90 €/dia",
    match: 94,
    avatar: "AS",
    interests: ["História", "Galerias", "Cafés"],
  },
  {
    name: "Miguel",
    role: "Comida e noite",
    budget: "Até 120 €/dia",
    match: 88,
    avatar: "MR",
    interests: ["Gastronomia", "Bares", "Mercados"],
  },
  {
    name: "Inês",
    role: "Ritmo calmo",
    budget: "Até 75 €/dia",
    match: 91,
    avatar: "IC",
    interests: ["Jardins", "Fotografia", "Miradouros"],
  },
];

export const audioGuideState: AudioGuideState = {
  title: "Caminho do Filósofo",
  location: "Kyoto, Japão",
  durationSeconds: 1720,
  currentChapter: "Entre cerejeiras e templos",
  transcript: [
    "À tua esquerda, o canal acompanha uma das rotas mais serenas de Higashiyama.",
    "A história deste caminho mistura filosofia moderna, rotina local e a beleza sazonal das cerejeiras.",
    "Daqui a 120 metros, abrimos uma pequena pausa para ouvir a água antes da próxima história.",
  ],
};

export const profile = {
  name: "Bruni Jesus",
  avatarImage: namedAsset("bruni-jesus.jfif"),
  level: "Explorador de Elite",
  city: "Lisboa",
  completedTours: 28,
  savedHours: 14,
  premiumStatus: "Premium ativo",
};
