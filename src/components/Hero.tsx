import { useEffect, useState } from "react";
import { PRODUCTS, formatBRL } from "../data/products";
import { ArrowIcon, BeanIcon, CupIcon, PinIcon, StarIcon } from "./Icons";

const ROTATING = ["jasmim", "rapadura", "bergamota", "cacau 70%", "pêssego branco", "caramelo salgado"];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % ROTATING.length), 2300);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="relative inline-flex h-[1.5em] min-w-[7.5ch] items-center overflow-hidden align-baseline sm:min-w-[9ch]">
      <span key={index} className="anim-word font-display italic text-amber">
        {ROTATING[index]}
      </span>
    </span>
  );
}

function RotaryStamp() {
  return (
    <div className="anim-spin-slow pointer-events-none absolute -right-6 -top-8 z-10 hidden h-32 w-32 text-amber sm:block lg:-right-10 lg:h-36 lg:w-36">
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <defs>
          <path id="stamp-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="59" fill="var(--color-espresso)" stroke="var(--color-amber)" strokeOpacity="0.5" />
        <text fontSize="11.5" letterSpacing="3.2" fill="var(--color-amber)" fontFamily="Karla, sans-serif" fontWeight="700">
          <textPath href="#stamp-circle">TORRA FRESCA · 100% ARÁBICA · DESDE 2019 ·</textPath>
        </text>
        <g transform="translate(60 60)">
          <g transform="rotate(-28)">
            <ellipse cx="0" cy="0" rx="9" ry="14" fill="none" stroke="var(--color-amber)" strokeWidth="2" />
            <path d="M0 -13.5c-3.6 4.6-3.6 9.2 0 13.5s3.6 8.9 0 13.5" fill="none" stroke="var(--color-amber)" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function Hero({ onOpenProduct }: { onOpenProduct: (id: string) => void }) {
  const featured = PRODUCTS[0];

  return (
    <section id="topo" className="relative overflow-hidden bg-espresso pb-16 pt-28 text-crema sm:pb-24 sm:pt-32">
      {/* textura de fundo em camadas */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-amber/[0.07] blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 h-[26rem] w-[26rem] rounded-full bg-rust/[0.08] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.16]" style={{ backgroundImage: "radial-gradient(var(--color-crema) 0.8px, transparent 0.8px)", backgroundSize: "26px 26px" }} />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* coluna de texto */}
        <div className="lg:col-span-7">
          <p className="anim-fade-up flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-amber" style={{ animationDelay: "80ms" }}>
            <BeanIcon size={16} />
            Torrefação artesanal · safra 2025
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.9rem,7.5vw,5.6rem)] font-medium leading-[0.98] tracking-tight">
            <span className="mask-line"><span style={{ animationDelay: "0.1s" }}>Do terreiro</span></span>
            <span className="mask-line"><span style={{ animationDelay: "0.22s" }}>direto para</span></span>
            <span className="mask-line"><span style={{ animationDelay: "0.34s" }}>a sua <em className="font-light italic text-amber">xícara.</em></span></span>
          </h1>

          <p className="anim-fade-up mt-7 max-w-xl text-lg leading-relaxed text-crema/75" style={{ animationDelay: "500ms" }}>
            Seis microlotes de cinco origens, torrados em pequenos lotes toda terça-feira.
            Hoje, a bancada cheira a <RotatingWord />
          </p>

          <div className="anim-fade-up mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: "620ms" }}>
            <a
              href="#catalogo"
              className="group inline-flex h-13 items-center gap-3 bg-amber px-7 py-4 font-bold uppercase tracking-[0.14em] text-espresso transition-all duration-300 hover:bg-crema hover:tracking-[0.2em] active:scale-[0.97]"
            >
              Explorar catálogo
              <ArrowIcon size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
            <a
              href="#preparo"
              className="group inline-flex items-center gap-2.5 py-4 font-semibold text-crema/85 transition-colors hover:text-amber"
            >
              <span className="relative">
                receita da casa
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-amber/50 transition-transform duration-300 group-hover:scale-x-0" />
              </span>
              <span className="text-amber transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* estatísticas */}
          <dl className="anim-fade-up mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-crema/15 pt-8 sm:grid-cols-4" style={{ animationDelay: "740ms" }}>
            {[
              ["6", "microlotes ativos"],
              ["5", "países de origem"],
              ["87+", "pontuação média SCA"],
              ["48h", "da torra ao envio"],
            ].map(([num, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-3xl font-semibold text-amber">{num}</dd>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.18em] text-crema/55">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* coluna visual */}
        <div className="relative lg:col-span-5">
          <RotaryStamp />
          <div className="anim-fade-up relative overflow-hidden border border-crema/15 shadow-warm" style={{ animationDelay: "300ms" }}>
            <div className="overflow-hidden">
              <img
                src="https://image.qwenlm.ai/generated-images/c8410ae8-5b90-4c00-9e5a-b839fb751f0e/_result.png"
                alt="Preparo de café coado na torrefação, com chaleira gooseneck e vapor subindo"
                className="anim-kenburns aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-roast/70 via-transparent to-transparent" aria-hidden="true" />

            {/* vapor decorativo */}
            <div className="pointer-events-none absolute left-10 top-8 flex flex-col items-center gap-1" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span key={i} className="anim-steam h-1 w-8 rounded-full bg-crema/40 blur-[2px]" style={{ animationDelay: `${i * 0.8}s` }} />
              ))}
            </div>

            {/* cartão flutuante do café destaque */}
            <div className="anim-float absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:w-[19rem]">
              <button
                onClick={() => onOpenProduct(featured.id)}
                className="group flex w-full items-center gap-4 border border-espresso/10 bg-parchment p-3.5 text-left text-espresso shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-warm"
              >
                <img src={featured.image} alt="" className="h-16 w-13 shrink-0 object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-cocoa">destaque da semana</span>
                  <span className="mt-0.5 flex items-center gap-1.5 font-display text-lg font-semibold leading-tight">
                    {featured.name}
                  </span>
                  <span className="mt-0.5 flex items-center gap-2 text-xs text-espresso/65">
                    <span className="inline-flex items-center gap-0.5 text-amber-deep"><StarIcon size={12} /> {featured.score}</span>
                    · {formatBRL(featured.price)}
                  </span>
                </span>
                <span className="grid h-9 w-9 shrink-0 place-items-center bg-espresso text-crema transition-all duration-300 group-hover:bg-amber group-hover:text-espresso">
                  <ArrowIcon size={16} className="-rotate-45" />
                </span>
              </button>
            </div>
          </div>

          <p className="mt-3 flex items-center justify-end gap-2 text-xs uppercase tracking-[0.2em] text-crema/45">
            <PinIcon size={13} /> Bancada 3 · torrefação Torralta
          </p>
        </div>
      </div>

      {/* separador inferior em dentes */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <CupIcon className="absolute bottom-3 right-8 hidden text-crema/15 lg:block" size={56} />
      </div>
    </section>
  );
}
