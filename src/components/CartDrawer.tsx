import { useEffect, useRef } from "react";
import {
  FREE_SHIPPING_FROM,
  SHIPPING_COST,
  formatBRL,
  type Product,
} from "../data/products";
import {
  ArrowIcon,
  BagIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  TruckIcon,
} from "./Icons";

export interface CartLine {
  product: Product;
  qty: number;
}

interface CartDrawerProps {
  open: boolean;
  lines: CartLine[];
  onClose: () => void;
  onSetQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({ open, lines, onClose, onSetQty, onRemove, onCheckout }: CartDrawerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // bloqueia foco por teclado enquanto o drawer está fechado
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    if (open) el.removeAttribute("inert");
    else el.setAttribute("inert", "");
  }, [open]);

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
  const missing = Math.max(0, FREE_SHIPPING_FROM - subtotal);
  const progress = Math.min(subtotal / FREE_SHIPPING_FROM, 1);

  return (
    <div ref={wrapperRef} className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <button
        className={`absolute inset-0 w-full bg-roast/65 transition-opacity duration-400 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
        aria-label="Fechar sacola"
        tabIndex={open ? 0 : -1}
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-warm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Sacola de compras"
      >
        {/* topo */}
        <div className="flex items-center justify-between border-b border-espresso/12 bg-espresso px-6 py-5 text-crema">
          <div className="flex items-center gap-3">
            <BagIcon size={20} className="text-amber" />
            <h2 className="font-display text-xl font-semibold">Sua sacola</h2>
            {count > 0 && (
              <span key={count} className="anim-badge grid h-6 min-w-6 place-items-center rounded-full bg-amber px-1.5 text-xs font-bold text-espresso">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center border border-crema/25 transition-all duration-300 hover:rotate-90 hover:border-amber hover:text-amber"
            aria-label="Fechar sacola"
          >
            <CloseIcon size={16} />
          </button>
        </div>

        {/* barra de frete */}
        <div className="border-b border-espresso/12 bg-parchment px-6 py-4">
          {missing > 0 ? (
            <p className="flex items-center gap-2.5 text-sm font-semibold text-espresso/80">
              <TruckIcon size={17} className="shrink-0 text-amber-deep" />
              Faltam <strong className="font-display text-base text-rust">{formatBRL(missing)}</strong> para o frete grátis
            </p>
          ) : (
            <p className="flex items-center gap-2.5 text-sm font-bold text-olive">
              <TruckIcon size={17} />
              Frete grátis garantido para este pedido!
            </p>
          )}
          <div className="mt-3 h-2 overflow-hidden bg-espresso/10">
            <div
              className="h-full bg-gradient-to-r from-amber-deep to-amber transition-[width] duration-700 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* itens */}
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full border-2 border-dashed border-espresso/25 text-espresso/35">
              <BagIcon size={34} />
            </span>
            <h3 className="mt-6 font-display text-2xl font-semibold">Sacola vazia</h3>
            <p className="mt-2 text-sm leading-relaxed text-espresso/60">
              A prateleira está cheia de microlotes esperando por você. Que tal começar pelo destaque da semana?
            </p>
            <button
              onClick={onClose}
              className="mt-7 flex items-center gap-2.5 bg-espresso px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-crema transition-all duration-300 hover:bg-amber hover:text-espresso active:scale-95"
            >
              Ver cafés
              <ArrowIcon size={16} />
            </button>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-espresso/10 overflow-y-auto px-6">
            {lines.map(({ product, qty }) => (
              <li key={product.id} className="anim-fade-up flex gap-4 py-5">
                <img src={product.image} alt="" className="h-20 w-16 shrink-0 object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-[1.05rem] font-semibold leading-tight">{product.name}</p>
                      <p className="mt-0.5 text-xs text-espresso/55">{product.country} · {product.weight}</p>
                    </div>
                    <button
                      onClick={() => onRemove(product.id)}
                      className="grid h-8 w-8 shrink-0 place-items-center text-espresso/40 transition-all duration-300 hover:bg-rust/10 hover:text-rust active:scale-90"
                      aria-label={`Remover ${product.name} da sacola`}
                    >
                      <TrashIcon size={15} />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center border border-espresso/25 bg-parchment">
                      <button
                        onClick={() => onSetQty(product.id, qty - 1)}
                        className="grid h-9 w-9 place-items-center transition-colors hover:bg-espresso hover:text-crema active:scale-90"
                        aria-label={`Diminuir quantidade de ${product.name}`}
                      >
                        <MinusIcon size={14} />
                      </button>
                      <span key={qty} className="anim-fade w-8 text-center font-display text-base font-semibold" aria-live="polite">
                        {qty}
                      </span>
                      <button
                        onClick={() => onSetQty(product.id, qty + 1)}
                        disabled={qty >= 10}
                        className="grid h-9 w-9 place-items-center transition-colors hover:bg-espresso hover:text-crema disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-espresso active:scale-90"
                        aria-label={`Aumentar quantidade de ${product.name}`}
                      >
                        <PlusIcon size={14} />
                      </button>
                    </div>
                    <p className="font-display text-lg font-semibold">
                      {formatBRL(product.price * qty)}
                      {qty > 1 && <span className="ml-1.5 text-[11px] font-body font-medium text-espresso/45">({qty}× {formatBRL(product.price)})</span>}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* rodapé */}
        {lines.length > 0 && (
          <div className="border-t border-espresso/12 bg-parchment px-6 py-5">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between text-espresso/70">
                <dt>Subtotal</dt>
                <dd className="font-semibold text-espresso">{formatBRL(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-espresso/70">
                <dt>Frete</dt>
                <dd className={`font-semibold ${shipping === 0 ? "text-olive" : "text-espresso"}`}>
                  {shipping === 0 ? "Grátis" : formatBRL(shipping)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-dashed border-espresso/25 pt-2.5">
                <dt className="font-bold uppercase tracking-[0.14em] text-xs">Total</dt>
                <dd className="font-display text-2xl font-semibold">{formatBRL(subtotal + shipping)}</dd>
              </div>
            </dl>
            <button
              onClick={onCheckout}
              className="group mt-5 flex h-13 w-full items-center justify-center gap-3 bg-espresso py-4 font-bold uppercase tracking-[0.16em] text-crema transition-all duration-300 hover:bg-amber hover:text-espresso active:scale-[0.98]"
            >
              Finalizar pedido
              <ArrowIcon size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
            <button onClick={onClose} className="mt-3 w-full py-1 text-center text-sm font-semibold text-espresso/55 underline decoration-espresso/30 underline-offset-4 transition-colors hover:text-espresso">
              ou continuar comprando
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
