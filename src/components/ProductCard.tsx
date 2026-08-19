import { useEffect, useRef, useState } from "react";
import { CATEGORY_LABEL, formatBRL, type Category, type Product } from "../data/products";
import { BagIcon, BeanIcon, CheckIcon, PinIcon, StarIcon } from "./Icons";

const CATEGORY_STYLE: Record<Category, string> = {
  clara: "bg-crema text-cocoa",
  media: "bg-amber text-espresso",
  escura: "bg-bark text-crema",
};

const ROAST_LEVEL: Record<Category, number> = { clara: 1, media: 2, escura: 3 };

interface ProductCardProps {
  product: Product;
  inCartQty: number;
  onAdd: (id: string) => void;
  onOpen: (id: string) => void;
  index: number;
}

export default function ProductCard({ product, inCartQty, onAdd, onOpen, index }: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current);
  }, []);

  const handleAdd = () => {
    onAdd(product.id);
    setJustAdded(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setJustAdded(false), 1500);
  };

  const level = ROAST_LEVEL[product.category];

  return (
    <article
      className="group flex h-full flex-col overflow-hidden border border-espresso/10 bg-parchment shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-espresso/25 hover:shadow-warm"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {/* imagem */}
      <div className="relative overflow-hidden">
        <button
          onClick={() => onOpen(product.id)}
          className="block w-full"
          aria-label={`Ver detalhes de ${product.name}`}
        >
          <img
            src={product.image}
            alt={`Embalagem do café ${product.name}`}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-espresso/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
          <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-14 items-center gap-2 whitespace-nowrap bg-crema px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-espresso transition-transform duration-500 group-hover:translate-y-0 group-focus-visible:translate-y-0">
            Ver detalhes
            <BeanIcon size={13} />
          </span>
        </button>

        <span className={`absolute left-3 top-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${CATEGORY_STYLE[product.category]}`}>
          {CATEGORY_LABEL[product.category]}
        </span>
        <span className="absolute right-3 top-3 flex items-center gap-1 bg-espresso/85 px-2 py-1 text-[11px] font-bold text-crema">
          <StarIcon size={11} className="text-amber" />
          {product.score} pts
        </span>
        {inCartQty > 0 && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-olive px-2.5 py-1 text-[11px] font-bold text-crema">
            <CheckIcon size={11} /> {inCartQty} na sacola
          </span>
        )}
      </div>

      {/* conteúdo */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cocoa">{product.farm}</p>
        <h3 className="mt-1.5 font-display text-[1.45rem] font-semibold leading-tight tracking-tight">
          <button onClick={() => onOpen(product.id)} className="text-left transition-colors hover:text-amber-deep">
            {product.name}
          </button>
        </h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-espresso/60">
          <PinIcon size={13} />
          {product.region} · {product.country}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {product.notes.map((note) => (
            <li key={note} className="border border-espresso/15 bg-paper px-2.5 py-1 text-[11px] font-medium tracking-wide text-espresso/75 transition-colors duration-300 group-hover:border-espresso/30">
              {note}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between border-t border-dashed border-espresso/20 pt-4">
            <div>
              <p className="font-display text-[1.6rem] font-semibold leading-none tracking-tight">
                {formatBRL(product.price)}
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-espresso/50">
                {product.weight} · grãos
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="flex items-center gap-1" title={`${CATEGORY_LABEL[product.category]} — nível ${level} de 3`} aria-label={`Intensidade da torra: ${level} de 3`}>
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full transition-colors ${i <= level ? "bg-cocoa" : "border border-cocoa/40"}`}
                  />
                ))}
              </span>
              <button
                onClick={handleAdd}
                className={`flex h-11 items-center gap-2 px-4 text-sm font-bold uppercase tracking-[0.1em] transition-all duration-300 active:scale-95 ${
                  justAdded
                    ? "bg-olive text-crema"
                    : "bg-espresso text-crema hover:bg-amber hover:text-espresso"
                }`}
              >
                {justAdded ? <CheckIcon size={16} /> : <BagIcon size={16} />}
                {justAdded ? "Na sacola!" : "Adicionar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
