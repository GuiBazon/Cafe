import { BeanIcon } from "./Icons";

const NOTES = [
  "jasmim",
  "bergamota",
  "rapadura",
  "pêssego branco",
  "cacau 70%",
  "caramelo salgado",
  "melaço de cana",
  "flor de laranjeira",
  "avelã torrada",
  "chá preto",
];

export default function Ticker() {
  const row = (key: string, hidden: boolean) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {NOTES.map((note) => (
        <span key={`${key}-${note}`} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-lg italic tracking-wide text-espresso sm:text-xl">
            {note}
          </span>
          <BeanIcon size={15} className="shrink-0 text-espresso/60" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative z-10 overflow-hidden border-y border-espresso/15 bg-amber py-3.5">
      <div className="anim-marquee flex w-max">
        {row("a", false)}
        {row("b", true)}
      </div>
    </div>
  );
}
