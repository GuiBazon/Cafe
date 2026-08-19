import { useEffect, useState } from "react";
import { BagIcon, BeanIcon } from "./Icons";

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 bg-espresso text-crema transition-shadow duration-500 ${
        scrolled ? "shadow-[0_10px_40px_-16px_rgba(27,16,10,0.65)]" : ""
      }`}
    >
      {/* barra de progresso de leitura */}
      <div
        className="absolute left-0 top-0 h-[3px] bg-amber transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#topo" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center bg-amber text-espresso transition-transform duration-500 group-hover:rotate-[18deg]">
            <BeanIcon size={22} />
          </span>
          <span className="leading-none">
            <span className="font-display text-[1.35rem] font-semibold tracking-tight">Torralta</span>
            <span className="mt-0.5 hidden text-[10px] uppercase tracking-[0.32em] text-crema/60 sm:block">
              cafés de origem
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium tracking-wide md:flex">
          <a href="#catalogo" className="relative py-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-amber after:transition-all after:duration-300 hover:after:w-full">
            Catálogo
          </a>
          <a href="#preparo" className="relative py-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-amber after:transition-all after:duration-300 hover:after:w-full">
            O preparo
          </a>
          <a href="#contato" className="relative py-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-amber after:transition-all after:duration-300 hover:after:w-full">
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 border border-crema/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-crema/70 lg:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-amber [animation:pulse-dot_2.4s_ease-in-out_infinite]" />
            torra de terça
          </span>
          <button
            onClick={onOpenCart}
            className="relative flex h-11 items-center gap-2.5 bg-crema px-4 font-semibold text-espresso transition-all duration-300 hover:bg-amber active:scale-95"
            aria-label="Abrir sacola de compras"
          >
            <BagIcon size={19} />
            <span className="hidden sm:inline">Sacola</span>
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="anim-badge absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-rust px-1 text-xs font-bold text-crema"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
