export type Category = "clara" | "media" | "escura";

export type BrewMethod = "v60" | "coado" | "prensa" | "espresso" | "aeropress";

export interface Product {
  id: string;
  name: string;
  farm: string;
  country: string;
  region: string;
  category: Category;
  process: string;
  variety: string;
  altitude: string;
  score: number;
  price: number;
  weight: string;
  notes: string[];
  description: string;
  profile: { torra: number; corpo: number; acidez: number; docura: number };
  methods: BrewMethod[];
  image: string;
  accent: string;
}

export const FREE_SHIPPING_FROM = 149;
export const SHIPPING_COST = 16.9;

export const CATEGORY_LABEL: Record<Category, string> = {
  clara: "Torra clara",
  media: "Torra média",
  escura: "Torra escura",
};

export const METHOD_LABEL: Record<BrewMethod, string> = {
  v60: "V60",
  coado: "Coado",
  prensa: "Prensa francesa",
  espresso: "Espresso",
  aeropress: "AeroPress",
};

export const PRODUCTS: Product[] = [
  {
    id: "geisha-boquete",
    name: "Geisha Boquete",
    farm: "Finca La Cumbre",
    country: "Panamá",
    region: "Chiriquí · Vulcão Barú",
    category: "clara",
    process: "Lavado",
    variety: "Geisha",
    altitude: "1.700 m",
    score: 89,
    price: 98,
    weight: "250 g",
    notes: ["Pêssego branco", "Jasmim", "Mel"],
    description:
      "Um microlote raro das encostas do vulcão Barú, colhido cereja a cereja. A torra clara preserva a transparência da variedade: floral e delicado, com doçura de mel e um final longo que lembra pêssego branco maduro.",
    profile: { torra: 25, corpo: 40, acidez: 80, docura: 78 },
    methods: ["v60", "aeropress"],
    image: "https://image.qwenlm.ai/generated-images/97880436-59d2-4fa5-9889-8f48d4c250b0/_result.png",
    accent: "#d9a441",
  },
  {
    id: "yirgacheffe-idido",
    name: "Yirgacheffe Idido",
    farm: "Cooperativa Idido",
    country: "Etiópia",
    region: "Gedeo · Yirgacheffe",
    category: "clara",
    process: "Lavado",
    variety: "Heirloom",
    altitude: "2.100 m",
    score: 87,
    price: 74,
    weight: "250 g",
    notes: ["Bergamota", "Limão-siciliano", "Chá preto"],
    description:
      "Lavado clássico de Gedeo, seco lentamente em camas africanas. Cítrico vibrante, corpo sedoso de chá preto e um perfume de jasmim que toma conta da cozinha durante a extração.",
    profile: { torra: 28, corpo: 35, acidez: 85, docura: 62 },
    methods: ["v60", "coado"],
    image: "https://image.qwenlm.ai/generated-images/4bbca9ec-0c19-41ff-83a4-22eb6d9a6901/_result.png",
    accent: "#cbb545",
  },
  {
    id: "bourbon-amarelo",
    name: "Bourbon Amarelo",
    farm: "Sítio Boa Vista",
    country: "Brasil",
    region: "Carmo de Minas · MG",
    category: "media",
    process: "Natural",
    variety: "Bourbon Amarelo",
    altitude: "1.300 m",
    score: 85,
    price: 58,
    weight: "250 g",
    notes: ["Chocolate ao leite", "Avelã", "Rapadura"],
    description:
      "Natural de altitude do Sul de Minas, colhido a dedo e secado em terreiro suspenso. Redondo e aconchegante: chocolate ao leite, avelã torrada e uma doçura de rapadura que fica na boca.",
    profile: { torra: 55, corpo: 70, acidez: 45, docura: 82 },
    methods: ["coado", "prensa", "espresso"],
    image: "https://image.qwenlm.ai/generated-images/0ab805b0-f0ec-4ea1-9ad4-5f09a23b5a99/_result.png",
    accent: "#c07c2e",
  },
  {
    id: "huehuetenango-sierra",
    name: "Huehuetenango La Sierra",
    farm: "Finca La Sierra",
    country: "Guatemala",
    region: "Huehuetenango",
    category: "media",
    process: "Lavado",
    variety: "Caturra · Catuaí",
    altitude: "1.850 m",
    score: 86,
    price: 66,
    weight: "250 g",
    notes: ["Caramelo", "Maçã vermelha", "Cacau"],
    description:
      "Das montanhas mais altas da Guatemala, onde o ar seco do deserto encontra o ar úmido do Pacífico. Caramelo e maçã vermelha com acidez suculenta — o equilíbrio que fez a fama de Huehue.",
    profile: { torra: 58, corpo: 62, acidez: 60, docura: 75 },
    methods: ["v60", "coado"],
    image: "https://image.qwenlm.ai/generated-images/7bbe459f-f0c7-4df0-9f27-79dc647a1f46/_result.png",
    accent: "#b4552d",
  },
  {
    id: "catuai-vermelho",
    name: "Catuaí Vermelho",
    farm: "Fazenda Santa Mônica",
    country: "Brasil",
    region: "Cerrado Mineiro · MG",
    category: "escura",
    process: "Natural",
    variety: "Catuaí Vermelho",
    altitude: "1.050 m",
    score: 84,
    price: 52,
    weight: "250 g",
    notes: ["Cacau 70%", "Castanha", "Melaço"],
    description:
      "O café da casa. Corpo cheio e torra desenvolvida para espresso e coados intensos: cacau 70%, castanha-do-pará e melaço de cana. Aguenta leite sem perder a personalidade.",
    profile: { torra: 85, corpo: 88, acidez: 28, docura: 64 },
    methods: ["espresso", "prensa"],
    image: "https://image.qwenlm.ai/generated-images/15715026-8c86-4121-88e3-c963301815fc/_result.png",
    accent: "#6f4526",
  },
  {
    id: "mandheling-samosir",
    name: "Mandheling Samosir",
    farm: "Pequenos produtores",
    country: "Indonésia",
    region: "Sumatra · Lago Toba",
    category: "escura",
    process: "Giling Basah",
    variety: "Typica (Janda Berastagi)",
    altitude: "1.500 m",
    score: 83,
    price: 62,
    weight: "250 g",
    notes: ["Chocolate amargo", "Especiarias", "Cedro"],
    description:
      "Processado pelo método Giling Basah, à moda de Sumatra: casca removida ainda úmida, o que cria sua textura densa e terrosa. Chocolate amargo, especiarias doces e um final longo de cedro.",
    profile: { torra: 82, corpo: 92, acidez: 24, docura: 55 },
    methods: ["prensa", "espresso"],
    image: "https://image.qwenlm.ai/generated-images/574cf60d-fa10-4be9-a9e9-d9e57915f24b/_result.png",
    accent: "#77713f",
  },
];

export const formatBRL = (value: number): string =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
