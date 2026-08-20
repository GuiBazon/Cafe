<div align="center">

# ☕ Torralta · Cafés de Origem

**E-commerce de café especial torrado na hora — do terreiro direto para a sua xícara.**

*React · TypeScript · Vite · Tailwind CSS v4*

</div>

---

## ✨ Sobre o projeto

A **Torralta** é uma loja virtual de uma torrefação artesanal fictícia. O catálogo apresenta **seis microlotes** de cinco países — Panamá, Etiópia, Brasil, Guatemala e Indonésia — cada um com ficha sensorial completa, pontuação SCA e foto editorial própria.

Toda a experiência de compra acontece no frontend: pesquisa instantânea, filtros por torra, detalhes do produto, carrinho com quantidades e um **checkout simulado** em etapas (entrega → pagamento → preparo → confirmação).

> ⚠️ **Simulação**: nenhum pagamento é processado e nenhum dado é enviado a servidores.

## 🚀 Funcionalidades

### Catálogo
- 🔍 **Pesquisa ao vivo** por nome, fazenda, origem, processo, variedade e notas sensoriais — com botão de limpar e estado vazio ilustrado.
- 🏷️ **Filtros por categoria** (Torra clara · média · escura) com contagem de itens, ordenação por curadoria/preço/pontuação e "limpar filtros".
- 📄 **Detalhes do produto** em modal: ficha técnica (processo, variedade, altitude), barras animadas de perfil sensorial (torra, corpo, acidez, doçura) e métodos de preparo recomendados.

### Compra
- 🛒 **Carrinho em drawer lateral**: adicionar, remover, stepper de quantidade (1–10) e totais ao vivo.
- 🚚 **Frete inteligente**: R$ 16,90 fixos, grátis acima de R$ 149,00, com barra de progresso "faltam R$ X".
- 💳 **Checkout simulado** em etapas com validação inline, máscaras de cartão (número, validade, CVV), opção Pix com desconto e número de pedido gerado ao final.
- 🔔 **Toasts de feedback** a cada ação (adição à sacola, etc.) — sem `alert()` em lugar nenhum.

### Experiência
- 📱 **Responsivo**: desktop, tablet e mobile (drawer full-width, chips roláveis, grade adaptativa).
- ♿ **Acessível**: foco visível, ARIA nos modais/drawers, bloqueio de foco quando fechados e respeito total a `prefers-reduced-motion`.
- 🎨 **Identidade própria**: paleta espresso/creme/âmbar, tipografia *Fraunces* (display) + *Karla* (texto), textura de grão, letreiro de notas sensoriais, selo giratório e foto com efeito Ken Burns.

## 🛠️ Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| Estilos | Tailwind CSS v4 (`@theme` com tokens customizados) |
| Fontes | Fraunces (Google Fonts) + Karla (Google Fonts) |
| Ícones | SVG inline desenhados à mão (`Icons.tsx`) |

## ⚡ Como rodar

```bash
# 1. Instale as dependências
npm install

# 2. Desenvolvimento (http://localhost:5173)
npm run dev

# 3. Build de produção → pasta dist/
npm run build

# 4. Verificação de tipos
npm run typecheck
```

## 📁 Estrutura

```
├── index.html                  # Título, fontes e favicon
├── instrucoes.md               # Instruções resumidas do projeto
└── src/
    ├── App.tsx                 # Estado global: carrinho, filtros, modais
    ├── main.tsx                # Bootstrap do React
    ├── index.css               # Design system: tokens, keyframes, reduced-motion
    ├── data/
    │   └── products.ts         # 6 produtos, categorias, frete e formatação BRL
    └── components/
        ├── Header.tsx          # Barra de progresso de rolagem + sacola
        ├── Hero.tsx            # Abertura da torrefação + selo giratório
        ├── Ticker.tsx          # Letreiro de notas sensoriais
        ├── Catalog.tsx         # Busca, filtros, ordenação e grade
        ├── ProductCard.tsx     # Card com perfil sensorial
        ├── ProductModal.tsx    # Detalhes do produto
        ├── CartDrawer.tsx      # Sacola lateral + frete grátis
        ├── CheckoutModal.tsx   # Checkout simulado em etapas
        ├── MethodsBand.tsx     # Receita de preparo da casa (1:15)
        ├── Footer.tsx          # Newsletter e navegação
        ├── Toast.tsx           # Notificações
        ├── Reveal.tsx          # Scroll reveal (IntersectionObserver)
        └── Icons.tsx           # ~30 ícones SVG inline
```

## 🧮 Regras de negócio

| Regra | Valor |
| --- | --- |
| Frete padrão | R$ 16,90 |
| Frete grátis | pedidos ≥ R$ 149,00 |
| Quantidade máxima por item | 10 |
| Desconto Pix | 5% no checkout |
| Moeda | BRL (`Intl.NumberFormat` pt-BR) |

## ➕ Adicionando um novo café

Edite `src/data/products.ts` e acrescente um objeto ao array `PRODUCTS`:

```ts
{
  id: "meu-cafe",
  name: "Meu Café Novo",
  farm: "Fazenda Exemplo",
  country: "Brasil",
  region: "Região · UF",
  category: "media",                 // "clara" | "media" | "escura"
  process: "Natural",
  variety: "Catuaí",
  altitude: "1.200 m",
  score: 85,
  price: 64,
  weight: "250 g",
  notes: ["Chocolate", "Caramelo", "Noz-pecã"],
  description: "Texto da ficha…",
  profile: { torra: 55, corpo: 70, acidez: 45, docura: 80 },
  methods: ["coado", "espresso"],
  image: "url-da-foto.jpg",
  accent: "#c07c2e",
}
```

Busca, filtros, contagens, carrinho e checkout passam a incluir o novo item automaticamente.

## 🎨 Design system

- **Cores** (tokens Tailwind): `espresso #241610` · `parchment #faf4e6` · `paper #f3ebdb` · `amber #dd9a4a` · `rust #b0492b` · `olive #77713f`
- **Movimento**: revelação por máscara de linha, Ken Burns, marquee, scroll reveals e micro-interações de hover — todos com fallback estático via `prefers-reduced-motion`.
- **Textura**: camada de grão (SVG de ruído) sobre toda a página.

## 📜 Licença

Projeto de demonstração criado para fins de estudo — imagens de produto geradas por IA.
