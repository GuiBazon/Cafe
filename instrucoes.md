# Instruções do Projeto — Torralta

Resumo simples de tudo o que este projeto precisa fazer.

## 1. O que é

- App web de **e-commerce de café especial**, em **português (pt-BR)**.
- Loja fictícia de torrefação ("Torralta") com **6 produtos de exemplo**.

## 2. Funcionalidades obrigatórias

| Funcionalidade | Como deve funcionar |
| --- | --- |
| **Pesquisa** | Busca por nome, origem, processo, categoria ou nota sensorial; resultado ao vivo, com botão de limpar. |
| **Filtros por categoria** | Chips: Todos, Torra clara, Torra média, Torra escura (com contagem) + ordenação por preço/pontuação. |
| **Detalhes do produto** | Modal com ficha técnica, perfil sensorial (barras), métodos de preparo e quantidade. |
| **Controles do carrinho** | Drawer lateral: adicionar, remover item, stepper de quantidade (1–10), subtotal/frete/total. |
| **Atualização de quantidade** | Steppers no card (no carrinho), no modal e no drawer; badge do cabeçalho atualiza com animação. |
| **Checkout simulado** | Etapas: Entrega → Pagamento (cartão com máscaras ou Pix) → Processamento → Confirmação com nº de pedido. Nada é cobrado de verdade. |
| **Estilo visual** | Quente e refinado: paleta espresso/creme/âmbar, Fraunces + Karla, textura de grão, animações suaves. |
| **Responsivo** | Desktop e mobile: drawer full-width, chips roláveis, grade 1→3 colunas. |

## 3. Regras de negócio

- Frete fixo **R$ 16,90**; **grátis acima de R$ 149,00** (barra de progresso no carrinho).
- Máximo de **10 unidades** por item.
- Sem backend: dados em `src/data/products.ts`, checkout apenas simulado no frontend.
- Estado do carrinho em memória (limpa ao recarregar).

## 4. Stack e estrutura

- **React 18 + TypeScript + Vite + Tailwind CSS v4** (tokens em `@theme`).
- `src/App.tsx` — orquestra carrinho, filtros e modais.
- `src/data/products.ts` — produtos e regras.
- `src/components/` — Header, Hero, Ticker, Catalog, ProductCard, ProductModal, CartDrawer, CheckoutModal, MethodsBand, Footer, Toast, Icons, Reveal.
- Fotos de produto geradas por IA (URLs externas no arquivo de dados).

## 5. Como rodar

```bash
npm install
npm run dev       # desenvolvimento
npm run build     # produção (gera dist/)
npm run typecheck # verificação de tipos
```

## 6. Requisitos de qualidade

- Sem `alert/confirm` — usar toasts, modais e validação inline.
- Ícones em SVG inline (nada de emoji na UI).
- Todas as animações respeitam `prefers-reduced-motion`.
- Estado vazio tratado: busca sem resultados e carrinho vazio têm telas próprias.
- `npm run build` deve passar sem erros.
