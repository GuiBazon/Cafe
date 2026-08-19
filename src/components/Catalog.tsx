import { useMemo } from "react";
import { CATEGORY_LABEL, PRODUCTS, type Category, type Product } from "../data/products";
import { ChevronIcon, CloseIcon, SearchIcon, SteamIcon } from "./Icons";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export type SortKey = "relevancia" | "preco-asc" | "preco-desc" | "pontuacao";

interface CatalogProps {
  query: string;
  onQuery: (q: string) => void;
  category: Category | "todos";
  onCategory: (c: Category | "todos") => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
  onAdd: (id: string) => void;
  onOpen: (id: string) => void;
  cartQtyOf: (id: string) => number;
}

const CATEGORIES: Array<Category | "todos"> = ["todos", "clara", "media", "escura"];

const SORTS: Array<{ id: SortKey; label: string }> = [
  { id: "relevancia", label: "Curadoria da casa" },
  { id: "preco-asc", label: "Menor preço" },
  { id: "preco-desc", label: "Maior preço" },
  { id: "pontuacao", label: "Maior pontuação" },
];

export default function Catalog({
  query,
  onQuery,
  category,
  onCategory,
  sort,
  onSort,
  onAdd,
  onOpen,
  cartQtyOf,
}: CatalogProps) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list: Product[] = PRODUCTS.filter((p) => {
      const matchesCategory = category === "todos" || p.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = [p.name, p.farm, p.country, p.region, p.process, p.variety, CATEGORY_LABEL[p.category], ...p.notes]
        .join(" ")
        .toLowerCase();
      return q.split(/\s+/).every((word) => haystack.includes(word));
    });
    if (sort === "preco-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "preco-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "pontuacao") list = [...list].sort((a, b) => b.score - a.score);
    return list;
  }, [query, category, sort]);

  const countOf = (c: Category | "todos") =>
    c === "todos" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c).length;

  const hasActiveFilters = query.trim() !== "" || category !== "todos";

  return (
    <section id="catalogo" className="relative scroll-mt-16 bg-paper pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* cabeçalho da seção */}
        <div className="flex flex-col gap-6 pt-16 sm:pt-20 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-amber-deep">
              <span className="h-px w-10 bg-amber-deep" />
              Prateleira da semana
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-medium leading-[1.02] tracking-tight">
              O catálogo, <em className="italic text-cocoa">torra por torra</em>
            </h2>
          </Reveal>
          <Reveal delay={120} className="max-w-sm">
            <p className="text-[15px] leading-relaxed text-espresso/65">
              Cada saco sai da torradeira com data, lote e curva de torra impressos.
              Escolha pelo perfil: floral e cítrico nas claras, redondo nas médias, denso nas escuras.
            </p>
          </Reveal>
        </div>

        {/* barra de ferramentas fixa */}
        <Reveal delay={80}>
          <div className="sticky top-16 z-30 -mx-4 mt-10 border-y border-espresso/12 bg-paper/95 px-4 py-4 shadow-[0_14px_30px_-22px_rgba(36,22,16,0.35)] backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center">
              {/* busca */}
              <label className="group relative flex-1">
                <span className="sr-only">Pesquisar cafés</span>
                <SearchIcon size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-espresso/45 transition-colors group-focus-within:text-amber-deep" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => onQuery(e.target.value)}
                  placeholder="Buscar por nome, origem ou nota sensorial…"
                  className="h-12 w-full border border-espresso/20 bg-parchment pl-11 pr-10 text-[15px] outline-none transition-all duration-300 placeholder:text-espresso/40 focus:border-amber-deep focus:shadow-[0_0_0_3px_rgba(192,124,46,0.18)] [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                  <button
                    onClick={() => onQuery("")}
                    className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center text-espresso/50 transition-colors hover:text-rust"
                    aria-label="Limpar busca"
                  >
                    <CloseIcon size={15} />
                  </button>
                )}
              </label>

              {/* ordenação */}
              <label className="relative lg:w-60">
                <span className="sr-only">Ordenar por</span>
                <select
                  value={sort}
                  onChange={(e) => onSort(e.target.value as SortKey)}
                  className="h-12 w-full cursor-pointer appearance-none border border-espresso/20 bg-parchment px-4 pr-10 text-sm font-semibold outline-none transition-colors focus:border-amber-deep"
                >
                  {SORTS.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
                <ChevronIcon size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-espresso/50" />
              </label>
            </div>

            {/* chips de categoria */}
            <div className="no-scrollbar mt-3.5 flex items-center gap-2 overflow-x-auto pb-0.5">
              {CATEGORIES.map((c) => {
                const active = category === c;
                return (
                  <button
                    key={c}
                    onClick={() => onCategory(c)}
                    className={`flex shrink-0 items-center gap-2 border px-4 py-2 text-[13px] font-bold uppercase tracking-[0.1em] transition-all duration-300 active:scale-95 ${
                      active
                        ? "border-espresso bg-espresso text-crema shadow-card"
                        : "border-espresso/25 bg-transparent text-espresso/70 hover:border-espresso/60 hover:text-espresso"
                    }`}
                  >
                    {c === "todos" ? "Todos" : CATEGORY_LABEL[c]}
                    <span className={`text-[11px] font-semibold ${active ? "text-amber" : "text-espresso/40"}`}>
                      {countOf(c)}
                    </span>
                  </button>
                );
              })}
              {hasActiveFilters && (
                <button
                  onClick={() => {
                    onQuery("");
                    onCategory("todos");
                  }}
                  className="flex shrink-0 items-center gap-1.5 px-3 py-2 text-[13px] font-semibold text-rust underline decoration-rust/40 underline-offset-4 transition-colors hover:decoration-rust"
                >
                  <CloseIcon size={13} />
                  limpar filtros
                </button>
              )}
              <span className="ml-auto hidden shrink-0 text-sm text-espresso/55 sm:block">
                <strong className="font-display text-lg text-espresso">{filtered.length}</strong>{" "}
                {filtered.length === 1 ? "café encontrado" : "cafés encontrados"}
              </span>
            </div>
          </div>
        </Reveal>

        {/* grade */}
        {filtered.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 xl:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 90} className="h-full">
                <ProductCard product={p} inCartQty={cartQtyOf(p.id)} onAdd={onAdd} onOpen={onOpen} index={i} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="anim-fade-up mt-10 flex flex-col items-center border border-dashed border-espresso/25 bg-parchment/60 px-6 py-20 text-center">
            <SteamIcon size={52} className="text-espresso/30" />
            <h3 className="mt-6 font-display text-2xl font-semibold">Nenhum café por aqui…</h3>
            <p className="mt-2 max-w-sm text-espresso/60">
              Nada na prateleira combina com {query.trim() ? <em className="font-display italic">“{query.trim()}”</em> : "esse filtro"}.
              Tente outra nota sensorial — jasmim, caramelo, cacau…
            </p>
            <button
              onClick={() => {
                onQuery("");
                onCategory("todos");
              }}
              className="mt-7 bg-espresso px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-crema transition-all duration-300 hover:bg-amber hover:text-espresso active:scale-95"
            >
              Limpar busca e filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
