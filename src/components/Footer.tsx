import { useState, type FormEvent } from "react";
import { CATEGORY_LABEL, type Category } from "../data/products";
import { ArrowIcon, BeanIcon, CheckIcon, FlameIcon, LeafIcon, PinIcon, TruckIcon } from "./Icons";

interface FooterProps {
  onCategory: (c: Category | "todos") => void;
}

export default function Footer({ onCategory }: FooterProps) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) {
      setError("Digite um e-mail válido para entrar na lista.");
      return;
    }
    setError("");
    setSent(true);
  };

  const perks = [
    { icon: TruckIcon, text: "Frete grátis acima de R$ 149" },
    { icon: FlameIcon, text: "Torrado toda terça, enviado em 48h" },
    { icon: LeafIcon, text: "Compra direta de produtores" },
  ];

  return (
    <footer id="contato" className="scroll-mt-16 border-t border-amber/25 bg-roast text-crema">
      {/* selos */}
      <div className="border-b border-crema/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          {perks.map(({ icon: Icon, text }) => (
            <p key={text} className="flex items-center gap-3 text-sm font-semibold text-crema/80">
              <span className="grid h-9 w-9 shrink-0 place-items-center border border-amber/40 text-amber">
                <Icon size={17} />
              </span>
              {text}
            </p>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* marca */}
        <div className="lg:col-span-4">
          <a href="#topo" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center bg-amber text-espresso">
              <BeanIcon size={24} />
            </span>
            <span className="leading-none">
              <span className="font-display text-2xl font-semibold">Torralta</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.32em] text-crema/55">cafés de origem</span>
            </span>
          </a>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-crema/60">
            Micro-torrefação dedicada a cafés de fazendas que conhecemos pelo nome.
            Seis microlotes por vez, nem um a mais — para torrar cada um como merece.
          </p>
          <p className="mt-5 flex items-center gap-2 text-sm text-crema/50">
            <PinIcon size={15} className="text-amber" />
            Rua da Matriz, 42 · Carmo de Minas — MG
          </p>
        </div>

        {/* navegação loja */}
        <nav className="lg:col-span-2" aria-label="Loja">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.26em] text-amber">A prateleira</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {(["todos", "clara", "media", "escura"] as const).map((c) => (
              <li key={c}>
                <a
                  href="#catalogo"
                  onClick={() => onCategory(c)}
                  className="group inline-flex items-center gap-2 text-crema/70 transition-colors hover:text-amber"
                >
                  <span className="h-px w-0 bg-amber transition-all duration-300 group-hover:w-3" />
                  {c === "todos" ? "Todos os cafés" : CATEGORY_LABEL[c]}
                </a>
              </li>
            ))}
            <li>
              <a href="#preparo" className="group inline-flex items-center gap-2 text-crema/70 transition-colors hover:text-amber">
                <span className="h-px w-0 bg-amber transition-all duration-300 group-hover:w-3" />
                Receita da casa
              </a>
            </li>
          </ul>
        </nav>

        {/* contato */}
        <div className="lg:col-span-3">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.26em] text-amber">Balcão aberto</h3>
          <ul className="mt-5 space-y-3 text-sm text-crema/70">
            <li>
              <strong className="text-crema">ola@torralta.cafe</strong>
              <span className="block text-xs text-crema/45">respondemos entre uma torra e outra</span>
            </li>
            <li>
              <strong className="text-crema">(35) 3334-0042</strong>
              <span className="block text-xs text-crema/45">seg. a sáb. · 8h às 18h</span>
            </li>
            <li className="pt-1 text-xs leading-relaxed text-crema/45">
              Loja de demonstração — nenhum pagamento real é processado.
            </li>
          </ul>
        </div>

        {/* newsletter */}
        <div className="lg:col-span-3">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.26em] text-amber">Diário da torra</h3>
          <p className="mt-5 text-sm leading-relaxed text-crema/60">
            Toda terça, a ficha dos cafés que entraram na torradeira direto no seu e-mail.
          </p>
          {sent ? (
            <p className="anim-fade-up mt-5 flex items-center gap-3 border border-olive/60 bg-olive/15 px-4 py-3.5 text-sm font-semibold text-crema">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-olive"><CheckIcon size={15} /></span>
              Você está na lista. Até a próxima torra!
            </p>
          ) : (
            <form onSubmit={subscribe} className="mt-5" noValidate>
              <div className="flex">
                <label className="sr-only" htmlFor="news-email">Seu e-mail</label>
                <input
                  id="news-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="h-12 min-w-0 flex-1 border border-crema/25 bg-crema/[0.06] px-4 text-sm text-crema outline-none transition-colors placeholder:text-crema/35 focus:border-amber"
                />
                <button
                  type="submit"
                  className="grid h-12 w-12 shrink-0 place-items-center bg-amber text-espresso transition-all duration-300 hover:bg-crema active:scale-95"
                  aria-label="Assinar o diário da torra"
                >
                  <ArrowIcon size={18} />
                </button>
              </div>
              {error && <p className="mt-2 text-xs font-semibold text-amber">{error}</p>}
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-crema/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-crema/40 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2025 Torralta Cafés de Origem — feito com grãos selecionados e React.</p>
          <p className="flex items-center gap-2">
            <BeanIcon size={13} className="text-amber/70" />
            100% arábica, 0% pressa
          </p>
        </div>
      </div>
    </footer>
  );
}
