import { useEffect, useState } from "react";
import {
  CATEGORY_LABEL,
  METHOD_LABEL,
  formatBRL,
  type Category,
  type Product,
} from "../data/products";
import {
  AwardIcon,
  BagIcon,
  CheckIcon,
  CloseIcon,
  LeafIcon,
  MinusIcon,
  MountainIcon,
  PinIcon,
  PlusIcon,
  StarIcon,
} from "./Icons";

const CATEGORY_STYLE: Record<Category, string> = {
  clara: "bg-crema text-cocoa",
  media: "bg-amber text-espresso",
  escura: "bg-bark text-crema",
};

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAdd: (id: string, qty: number) => void;
}

export default function ProductModal({ product, onClose, onAdd }: ProductModalProps) {
  const [qty, setQty] = useState(1);
  const [barsReady, setBarsReady] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setBarsReady(true), 250);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const handleAdd = () => {
    onAdd(product.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const profileRows = [
    { label: "Torra", value: product.profile.torra, color: "bg-cocoa" },
    { label: "Corpo", value: product.profile.corpo, color: "bg-amber-deep" },
    { label: "Acidez", value: product.profile.acidez, color: "bg-amber" },
    { label: "Doçura", value: product.profile.docura, color: "bg-olive" },
  ];

  const meta = [
    { icon: PinIcon, label: "Origem", value: `${product.region} · ${product.country}` },
    { icon: MountainIcon, label: "Altitude", value: product.altitude },
    { icon: LeafIcon, label: "Processo", value: `${product.process} · ${product.variety}` },
    { icon: AwardIcon, label: "Pontuação SCA", value: `${product.score} pontos` },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={`Detalhes de ${product.name}`}>
      <button className="anim-fade absolute inset-0 bg-roast/70 backdrop-blur-[2px]" onClick={onClose} aria-label="Fechar detalhes" />

      <div className="anim-modal relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden bg-parchment shadow-warm sm:max-h-[88dvh]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center bg-espresso text-crema transition-all duration-300 hover:rotate-90 hover:bg-rust active:scale-90"
          aria-label="Fechar"
        >
          <CloseIcon size={18} />
        </button>

        <div className="grid overflow-y-auto sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* imagem */}
          <div className="relative sm:sticky sm:top-0 sm:h-full sm:self-stretch">
            <img src={product.image} alt={`Embalagem do café ${product.name}`} className="h-64 w-full object-cover sm:h-full" />
            <span className={`absolute left-4 top-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${CATEGORY_STYLE[product.category]}`}>
              {CATEGORY_LABEL[product.category]}
            </span>
            <span className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-espresso/85 px-2.5 py-1.5 text-xs font-bold text-crema">
              <StarIcon size={12} className="text-amber" />
              {product.score} pts SCA
            </span>
          </div>

          {/* detalhes */}
          <div className="flex flex-col p-6 sm:p-9">
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-cocoa">
              {product.farm} · {product.country}
            </p>
            <h3 className="mt-2 font-display text-[clamp(1.9rem,4vw,2.6rem)] font-semibold leading-[1.02] tracking-tight">
              {product.name}
            </h3>

            <ul className="mt-4 flex flex-wrap gap-2">
              {product.notes.map((n) => (
                <li key={n} className="border border-espresso/20 bg-paper px-3 py-1.5 text-[12px] font-semibold tracking-wide text-espresso/80">
                  {n}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-[15px] leading-relaxed text-espresso/75">{product.description}</p>

            {/* ficha técnica */}
            <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3.5 border-y border-espresso/12 py-5 sm:grid-cols-2">
              {meta.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center border border-espresso/15 text-amber-deep">
                    <Icon size={17} />
                  </span>
                  <div>
                    <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-espresso/45">{label}</dt>
                    <dd className="text-sm font-semibold">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>

            {/* perfil sensorial */}
            <div className="mt-6">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.26em] text-cocoa">Perfil sensorial</h4>
              <div className="mt-4 space-y-3.5">
                {profileRows.map((row, i) => (
                  <div key={row.label}>
                    <div className="mb-1.5 flex items-baseline justify-between">
                      <span className="text-sm font-semibold">{row.label}</span>
                      <span className="font-display text-sm italic text-espresso/55">{row.value}/100</span>
                    </div>
                    <div className="h-[7px] w-full overflow-hidden bg-espresso/10">
                      <div
                        className={`profile-fill h-full ${row.color} ${barsReady ? "grow" : ""}`}
                        style={{ width: `${row.value}%`, transitionDelay: `${i * 110}ms` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* métodos sugeridos */}
            <div className="mt-6">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.26em] text-cocoa">Brilha no preparo</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {product.methods.map((m) => (
                  <li key={m} className="bg-espresso px-3 py-1.5 text-[12px] font-semibold text-crema">
                    {METHOD_LABEL[m]}
                  </li>
                ))}
              </ul>
            </div>

            {/* compra */}
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-dashed border-espresso/25 pt-6">
              <div className="flex items-center border border-espresso/25">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  className="grid h-12 w-11 place-items-center transition-colors hover:bg-espresso hover:text-crema disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-espresso"
                  aria-label="Diminuir quantidade"
                >
                  <MinusIcon size={16} />
                </button>
                <span className="w-10 text-center font-display text-xl font-semibold" aria-live="polite">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  disabled={qty >= 10}
                  className="grid h-12 w-11 place-items-center transition-colors hover:bg-espresso hover:text-crema disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-espresso"
                  aria-label="Aumentar quantidade"
                >
                  <PlusIcon size={16} />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex h-12 flex-1 items-center justify-center gap-2.5 px-6 text-sm font-bold uppercase tracking-[0.12em] transition-all duration-300 active:scale-[0.98] sm:flex-none ${
                  added ? "bg-olive text-crema" : "bg-espresso text-crema hover:bg-amber hover:text-espresso"
                }`}
              >
                {added ? <CheckIcon size={17} /> : <BagIcon size={17} />}
                {added ? "Adicionado!" : `Adicionar · ${formatBRL(product.price * qty)}`}
              </button>
            </div>

            <p className="mt-4 text-xs text-espresso/50">
              Torrado em {product.weight} de grãos inteiros · moemos sob pedido sem custo · validade 90 dias
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
