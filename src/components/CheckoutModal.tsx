import { useEffect, useRef, useState } from "react";
import {
  FREE_SHIPPING_FROM,
  SHIPPING_COST,
  formatBRL,
} from "../data/products";
import type { CartLine } from "./CartDrawer";
import {
  BeanIcon,
  CardIcon,
  CheckIcon,
  CloseIcon,
  PixIcon,
  SteamIcon,
  TruckIcon,
} from "./Icons";

type Step = "dados" | "pagamento" | "processando" | "sucesso";

interface CheckoutModalProps {
  lines: CartLine[];
  onClose: () => void;
  onComplete: () => void;
}

const PROCESSING_MSGS = [
  "Moendo os grãos na hora…",
  "Conferindo a curva de torra…",
  "Selando a embalagem a vácuo…",
  "Avisando a transportadora…",
];

const onlyDigits = (v: string, max: number) => v.replace(/\D/g, "").slice(0, max);
const maskCEP = (v: string) => {
  const d = onlyDigits(v, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
};
const maskCard = (v: string) => onlyDigits(v, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
const maskExpiry = (v: string) => {
  const d = onlyDigits(v, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
};
const maskPhone = (v: string) => {
  const d = onlyDigits(v, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

export default function CheckoutModal({ lines, onClose, onComplete }: CheckoutModalProps) {
  const [step, setStep] = useState<Step>("dados");
  const [payMethod, setPayMethod] = useState<"cartao" | "pix">("cartao");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msgIndex, setMsgIndex] = useState(0);
  const [order, setOrder] = useState<{ code: string; count: number; total: number } | null>(null);

  const [form, setForm] = useState({
    nome: "", email: "", telefone: "", endereco: "", cidade: "", cep: "",
    cartao: "", validade: "", cvv: "", titular: "",
  });
  const timers = useRef<number[]>([]);

  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "processando") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      timers.current.forEach((t) => window.clearTimeout(t));
    };
  }, [step, onClose]);

  useEffect(() => {
    if (step !== "processando") return;
    const interval = window.setInterval(() => setMsgIndex((i) => (i + 1) % PROCESSING_MSGS.length), 650);
    const done = window.setTimeout(() => setStep("sucesso"), 2600);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(done);
    };
  }, [step]);

  const validateDados = () => {
    const e: Record<string, string> = {};
    if (form.nome.trim().length < 3) e.nome = "Informe seu nome completo";
    if (!/.+@.+\..+/.test(form.email)) e.email = "E-mail inválido";
    if (onlyDigits(form.telefone, 11).length < 10) e.telefone = "Telefone inválido";
    if (form.endereco.trim().length < 5) e.endereco = "Endereço completo, com número";
    if (form.cidade.trim().length < 2) e.cidade = "Informe a cidade";
    if (onlyDigits(form.cep, 8).length !== 8) e.cep = "CEP inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePagamento = () => {
    const e: Record<string, string> = {};
    if (payMethod === "cartao") {
      if (onlyDigits(form.cartao, 16).length !== 16) e.cartao = "Número deve ter 16 dígitos";
      const mm = onlyDigits(form.validade, 4).slice(0, 2);
      if (onlyDigits(form.validade, 4).length !== 4 || Number(mm) < 1 || Number(mm) > 12) e.validade = "Use MM/AA";
      if (onlyDigits(form.cvv, 4).length < 3) e.cvv = "CVV inválido";
      if (form.titular.trim().length < 3) e.titular = "Nome impresso no cartão";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const confirmOrder = () => {
    setOrder({
      code: `TA-${Math.floor(10000 + Math.random() * 90000)}`,
      count,
      total,
    });
    onComplete();
    setStep("processando");
  };

  const field = (
    key: keyof typeof form,
    label: string,
    placeholder: string,
    mask?: (v: string) => string,
    inputMode?: "numeric" | "email" | "text",
  ) => (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-espresso/60">{label}</span>
      <input
        type="text"
        inputMode={inputMode ?? "text"}
        value={form[key]}
        onChange={(e) => set(key, mask ? mask(e.target.value) : e.target.value)}
        placeholder={placeholder}
        className={`h-12 w-full border bg-parchment px-4 text-[15px] outline-none transition-all duration-300 placeholder:text-espresso/35 focus:border-amber-deep focus:shadow-[0_0_0_3px_rgba(192,124,46,0.18)] ${
          errors[key] ? "border-rust" : "border-espresso/20"
        }`}
      />
      {errors[key] && <span className="mt-1 block text-xs font-semibold text-rust">{errors[key]}</span>}
    </label>
  );

  const stepsNav = (
    <ol className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em]">
      {["Entrega", "Pagamento", "Confirmação"].map((label, i) => {
        const idx = ["dados", "pagamento", "sucesso"].indexOf(step === "processando" ? "sucesso" : step);
        const state = i < idx ? "done" : i === idx ? "current" : "todo";
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`grid h-6 w-6 place-items-center rounded-full text-[10px] transition-colors ${
                state === "done"
                  ? "bg-olive text-crema"
                  : state === "current"
                    ? "bg-espresso text-amber"
                    : "border border-espresso/30 text-espresso/45"
              }`}
            >
              {state === "done" ? <CheckIcon size={11} /> : i + 1}
            </span>
            <span className={state === "todo" ? "text-espresso/40" : "text-espresso"}>{label}</span>
            {i < 2 && <span className="h-px w-6 bg-espresso/20 sm:w-10" />}
          </li>
        );
      })}
    </ol>
  );

  const summary = (
    <div className="flex h-fit flex-col border border-espresso/12 bg-paper p-5">
      <h4 className="text-[11px] font-bold uppercase tracking-[0.22em] text-cocoa">Resumo do pedido</h4>
      <ul className="mt-4 space-y-2.5 border-b border-dashed border-espresso/20 pb-4 text-sm">
        {lines.map((l) => (
          <li key={l.product.id} className="flex items-center gap-3">
            <img src={l.product.image} alt="" className="h-11 w-9 shrink-0 object-cover" />
            <span className="min-w-0 flex-1 truncate font-semibold">{l.product.name}</span>
            <span className="shrink-0 text-espresso/55">{l.qty}×</span>
            <span className="shrink-0 font-display font-semibold">{formatBRL(l.product.price * l.qty)}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-3 space-y-1 text-sm text-espresso/70">
        <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatBRL(subtotal)}</dd></div>
        <div className="flex justify-between">
          <dt className="flex items-center gap-1.5"><TruckIcon size={14} /> Frete</dt>
          <dd className={shipping === 0 ? "font-bold text-olive" : ""}>{shipping === 0 ? "Grátis" : formatBRL(shipping)}</dd>
        </div>
        <div className="flex items-baseline justify-between pt-2 text-espresso">
          <dt className="text-xs font-bold uppercase tracking-[0.16em]">Total</dt>
          <dd className="font-display text-xl font-semibold">{formatBRL(total)}</dd>
        </div>
      </dl>
      <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-espresso/50">
        <SteamIcon size={14} className="mt-0.5 shrink-0 text-amber-deep" />
        Envio em até 48h após a torra, em embalagem valvulada com data do lote.
      </p>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Finalizar compra">
      <button
        className="anim-fade absolute inset-0 w-full bg-roast/75 backdrop-blur-[2px]"
        onClick={() => step !== "processando" && onClose()}
        aria-label="Fechar checkout"
      />

      <div className="anim-modal relative flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden bg-parchment shadow-warm">
        {step !== "processando" && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center bg-espresso text-crema transition-all duration-300 hover:rotate-90 hover:bg-rust"
            aria-label="Fechar"
          >
            <CloseIcon size={18} />
          </button>
        )}

        <div className="overflow-y-auto">
          {step === "dados" && (
            <div className="grid gap-8 p-6 sm:grid-cols-[1fr_270px] sm:p-8">
              <div>
                {stepsNav}
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight">Para onde enviamos?</h3>
                <p className="mt-2 text-sm text-espresso/60">Entregamos em todo o Brasil. O café sai da torrefação em até 48 horas.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">{field("nome", "Nome completo", "Maria da Silva")}</div>
                  {field("email", "E-mail", "maria@exemplo.com", undefined, "email")}
                  {field("telefone", "Telefone", "(35) 99999-0000", maskPhone, "numeric")}
                  <div className="sm:col-span-2">{field("endereco", "Endereço e número", "Rua dos Ipês, 128 — apto 42")}</div>
                  {field("cidade", "Cidade / UF", "Carmo de Minas — MG")}
                  {field("cep", "CEP", "37472-000", maskCEP, "numeric")}
                </div>
                <button
                  onClick={() => validateDados() && setStep("pagamento")}
                  className="mt-7 flex h-13 w-full items-center justify-center gap-2 bg-espresso py-4 font-bold uppercase tracking-[0.14em] text-crema transition-all duration-300 hover:bg-amber hover:text-espresso active:scale-[0.98]"
                >
                  Ir para pagamento →
                </button>
              </div>
              {summary}
            </div>
          )}

          {step === "pagamento" && (
            <div className="grid gap-8 p-6 sm:grid-cols-[1fr_270px] sm:p-8">
              <div>
                {stepsNav}
                <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight">Como você prefere pagar?</h3>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {(
                    [
                      { id: "cartao", label: "Cartão de crédito", icon: CardIcon },
                      { id: "pix", label: "Pix na hora", icon: PixIcon },
                    ] as const
                  ).map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setPayMethod(id)}
                      className={`flex items-center gap-3 border px-4 py-4 text-sm font-bold transition-all duration-300 active:scale-[0.98] ${
                        payMethod === id
                          ? "border-espresso bg-espresso text-crema shadow-card"
                          : "border-espresso/25 text-espresso/70 hover:border-espresso/60"
                      }`}
                    >
                      <Icon size={19} className={payMethod === id ? "text-amber" : "text-espresso/50"} />
                      {label}
                    </button>
                  ))}
                </div>

                {payMethod === "cartao" ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">{field("cartao", "Número do cartão", "4242 4242 4242 4242", maskCard, "numeric")}</div>
                    {field("validade", "Validade", "12/28", maskExpiry, "numeric")}
                    {field("cvv", "CVV", "123", (v) => onlyDigits(v, 4), "numeric")}
                    <div className="sm:col-span-2">{field("titular", "Nome impresso no cartão", "MARIA D SILVA")}</div>
                  </div>
                ) : (
                  <div className="mt-6 border border-espresso/15 bg-paper p-5">
                    <div className="flex items-center gap-4">
                      <span className="grid h-16 w-16 shrink-0 place-items-center bg-espresso text-amber">
                        <PixIcon size={30} />
                      </span>
                      <div>
                        <p className="font-display text-lg font-semibold">Aprovação imediata</p>
                        <p className="mt-1 text-sm leading-relaxed text-espresso/65">
                          O código Pix será gerado na confirmação. Válido por 30 minutos — mas entre nós: é demonstração, nenhum valor real será cobrado.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => setStep("dados")}
                    className="h-13 border border-espresso/25 px-6 py-4 font-bold uppercase tracking-[0.12em] text-espresso/70 transition-all duration-300 hover:border-espresso hover:text-espresso active:scale-[0.98]"
                  >
                    ← Voltar
                  </button>
                  <button
                    onClick={() => validatePagamento() && confirmOrder()}
                    className="flex h-13 flex-1 items-center justify-center gap-2.5 bg-espresso py-4 font-bold uppercase tracking-[0.14em] text-crema transition-all duration-300 hover:bg-amber hover:text-espresso active:scale-[0.98]"
                  >
                    <BeanIcon size={17} className="text-amber" />
                    Confirmar pedido · {formatBRL(total)}
                  </button>
                </div>
              </div>
              {summary}
            </div>
          )}

          {step === "processando" && (
            <div className="flex flex-col items-center px-6 py-20 text-center sm:py-24">
              <span className="relative grid h-24 w-24 place-items-center">
                <span className="absolute inset-0 animate-spin rounded-full border-2 border-espresso/15 border-t-amber-deep" />
                <BeanIcon size={40} className="text-cocoa [animation:spin-slow_3s_linear_infinite]" />
              </span>
              <h3 className="mt-8 font-display text-3xl font-semibold tracking-tight">Preparando seu pedido</h3>
              <p key={msgIndex} className="anim-fade-up mt-3 min-h-6 text-[15px] font-semibold text-amber-deep">
                {PROCESSING_MSGS[msgIndex]}
              </p>
              <p className="mt-2 text-sm text-espresso/55">Isso leva só alguns segundos — o cheiro, infelizmente, não chega pela tela.</p>
            </div>
          )}

          {step === "sucesso" && order && (
            <div className="flex flex-col items-center px-6 py-14 text-center sm:py-16">
              <span className="anim-badge grid h-20 w-20 place-items-center rounded-full bg-olive text-crema">
                <CheckIcon size={36} />
              </span>
              <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.3em] text-olive">Pedido confirmado</p>
              <h3 className="mt-3 font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight tracking-tight">
                Seu café já está <em className="italic text-amber-deep">na fila da torra.</em>
              </h3>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-espresso/65">
                Pedido <strong className="font-display text-lg">{order.code}</strong> · {order.count}{" "}
                {order.count === 1 ? "pacote" : "pacotes"} · total de{" "}
                <strong className="font-display text-lg">{formatBRL(order.total)}</strong>.
                Você receberia o rastreio por e-mail — esta é uma loja de demonstração, então o cafezinho fica por conta da imaginação.
              </p>

              <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:flex-row">
                <button
                  onClick={onClose}
                  className="flex h-13 flex-1 items-center justify-center gap-2.5 bg-espresso py-4 font-bold uppercase tracking-[0.14em] text-crema transition-all duration-300 hover:bg-amber hover:text-espresso active:scale-[0.98]"
                >
                  Voltar à loja
                </button>
              </div>
              <p className="mt-5 flex items-center gap-2 text-xs text-espresso/45">
                <TruckIcon size={14} /> Entrega simulada em 3–5 dias úteis
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
