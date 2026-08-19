import { BagIcon } from "./Icons";

export interface ToastData {
  id: number;
  msg: string;
}

export default function Toast({ toast }: { toast: ToastData | null }) {
  if (!toast) return null;
  return (
    <div
      key={toast.id}
      className="anim-toast fixed bottom-6 left-1/2 z-[70] flex w-max max-w-[calc(100vw-2rem)] items-center gap-3 border border-amber/40 bg-espresso px-5 py-3.5 text-crema shadow-warm"
      role="status"
      aria-live="polite"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber text-espresso">
        <BagIcon size={15} />
      </span>
      <p className="text-sm font-semibold leading-snug">{toast.msg}</p>
    </div>
  );
}
