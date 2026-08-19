import type { ComponentType, SVGProps } from "react";
import { DropIcon, ScaleIcon, SpiralIcon, TimerIcon } from "./Icons";
import Reveal from "./Reveal";

interface StepDef {
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  title: string;
  text: string;
  tag: string;
}

const STEPS: StepDef[] = [
  {
    icon: ScaleIcon,
    title: "Pese e escalde",
    text: "Escalde o filtro de papel com água quente e pese 20 g de café moído na hora, em moagem média-fina.",
    tag: "20 g · moagem média-fina",
  },
  {
    icon: SpiralIcon,
    title: "Acorde o café",
    text: "Despeje 60 ml e espere 30 segundos: o pó incha, libera CO₂ e revela os aromas da torra da semana.",
    tag: "60 ml · 30 s de pré-infusão",
  },
  {
    icon: DropIcon,
    title: "Despeje em espirais",
    text: "Complete com o restante da água em círculos lentos, do centro para fora, mantendo o ritmo constante.",
    tag: "300 ml · 92 °C",
  },
  {
    icon: TimerIcon,
    title: "Paciência, xícara",
    text: "A extração termina por volta dos 3 minutos. Gire a jarra, sirva e prove antes de pensar em açúcar.",
    tag: "~3 min no total",
  },
];

export default function MethodsBand() {
  return (
    <section id="preparo" className="relative scroll-mt-16 overflow-hidden bg-espresso py-20 text-crema sm:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-32 top-0 h-[26rem] w-[26rem] rounded-full bg-amber/[0.06] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "radial-gradient(var(--color-crema) 0.7px, transparent 0.7px)", backgroundSize: "24px 24px" }} />
        <span className="absolute -bottom-10 -left-6 select-none font-display text-[11rem] font-bold italic leading-none text-crema/[0.045]">1:15</span>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-amber">
              <span className="h-px w-10 bg-amber" />
              O preparo
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-medium leading-[1.02] tracking-tight">
              A receita da casa, <em className="italic text-amber">sem mistério.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-crema/70">
              Todo café da Torralta sai daqui com uma ficha de preparo. Esta é a que usamos na bancada
              para qualquer coado do catálogo — mude apenas a moagem conforme o método.
            </p>
            <div className="mt-8 inline-flex items-center gap-4 border border-crema/20 bg-crema/[0.04] px-5 py-4">
              <span className="font-display text-4xl font-semibold text-amber">1:15</span>
              <span className="text-[13px] leading-snug text-crema/70">
                proporção de ouro<br />
                <strong className="text-crema">20 g de café para 300 ml de água</strong>
              </span>
            </div>
          </Reveal>
        </div>

        <ol className="lg:col-span-7">
          {STEPS.map(({ icon: Icon, title, text, tag }, i) => (
            <Reveal as="li" key={title} delay={i * 110}>
              <div className="group flex items-start gap-5 border-b border-crema/12 py-7 transition-all duration-500 hover:border-amber/50 hover:bg-crema/[0.03] hover:pl-3 sm:gap-8 sm:py-8">
                <span className="font-display text-[2.6rem] font-light italic leading-none text-crema/30 transition-colors duration-500 group-hover:text-amber sm:text-[3.2rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl font-semibold sm:text-2xl">{title}</h3>
                    <span className="border border-amber/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-amber">
                      {tag}
                    </span>
                  </div>
                  <p className="mt-2.5 max-w-lg text-[15px] leading-relaxed text-crema/65">{text}</p>
                </div>
                <span className="mt-1 grid h-12 w-12 shrink-0 place-items-center border border-crema/20 text-crema/70 transition-all duration-500 group-hover:rotate-6 group-hover:border-amber group-hover:text-amber">
                  <Icon size={22} />
                </span>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
