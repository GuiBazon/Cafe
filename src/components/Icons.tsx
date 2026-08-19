import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (p: P) => ({
  width: p.size ?? 20,
  height: p.size ?? 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});

export const BeanIcon = (p: P) => (
  <svg {...base(p)}>
    <g transform="rotate(-28 12 12)">
      <path d="M12 3.5c4.2 0 7 3.8 7 8.5s-2.8 8.5-7 8.5-7-3.8-7-8.5 2.8-8.5 7-8.5Z" />
      <path d="M12 3.5c-2.6 3.2-2.6 6.3 0 8.5s2.6 5.3 0 8.5" />
    </g>
  </svg>
);

export const FlameIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3c.9 3.2 4.3 4.7 4.3 8.4a4.3 4.3 0 0 1-8.6 0c0-1.5.6-2.7 1.5-3.9.3 1 .9 1.7 1.6 1.9-.4-2.1-.1-4.3 1.2-6.4Z" />
    <path d="M8.5 20.5h7" />
  </svg>
);

export const CupIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 9h12v5.5A4.5 4.5 0 0 1 11.5 19h-3A4.5 4.5 0 0 1 4 14.5V9Z" />
    <path d="M16 10h1.8a2.4 2.4 0 0 1 0 4.8H16" />
    <path d="M7.5 3.5c-.6.8-.6 1.4 0 2.2M11 3.5c-.6.8-.6 1.4 0 2.2" />
  </svg>
);

export const DropIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3.5s6 6.6 6 10.7a6 6 0 0 1-12 0C6 10.1 12 3.5 12 3.5Z" />
    <path d="M9.5 14.2a2.6 2.6 0 0 0 2.2 2.6" />
  </svg>
);

export const MountainIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M3 18.5 9.2 8l3 4.6 2.6-3.6 6.2 9.5H3Z" />
    <path d="M8 11.5l1.2 1 1.2-1" />
  </svg>
);

export const LeafIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4.5 19.5C4.5 10.5 10.5 4.5 19.5 4.5c0 9-6 15-15 15Z" />
    <path d="M4.5 19.5c3.5-5.5 7.5-9.5 12.5-12.5" />
  </svg>
);

export const SearchIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="10.5" cy="10.5" r="6" />
    <path d="m19.5 19.5-4.7-4.7" />
  </svg>
);

export const BagIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5.5 8h13l-1 12h-11l-1-12Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const ArrowIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12h16M13.5 5.5 20 12l-6.5 6.5" />
  </svg>
);

export const StarIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="m12 3.6 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.6Z" />
  </svg>
);

export const TrashIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4.5 6.5h15M9.5 6V4.5h5V6M6.5 6.5l.8 13h9.4l.8-13" />
    <path d="M10 10.5v5.5M14 10.5v5.5" />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s-6.5-5.7-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.3 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.3" />
  </svg>
);

export const TruckIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M2.5 6h11v10h-11zM13.5 9.5H18l3 3.5v3h-7.5" />
    <circle cx="6.5" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);

export const CardIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="M3 10h18M6.5 14.5h4" />
  </svg>
);

export const PixIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 2.8 21.2 12 12 21.2 2.8 12 12 2.8Z" />
    <path d="M8 12h8M12 8v8" opacity="0.55" />
  </svg>
);

export const TimerIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="13" r="7.5" />
    <path d="M12 9.5V13l2.5 2M10 2.5h4" />
  </svg>
);

export const SpiralIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 12c0-1.8 2.4-2.4 3.6-1.2 1.4 1.4.7 3.8-1.2 4.7-2.6 1.2-5.6-.4-6.2-3.1-.7-3.4 2.1-6.4 5.5-6.4 4.1 0 7 3.6 6.3 7.6" />
    <path d="M12 12h.01" />
  </svg>
);

export const ScaleIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="16" height="16" rx="2.5" />
    <path d="M12 4a8 8 0 0 0-7 4h14a8 8 0 0 0-7-4Z" />
    <path d="m12 8-2 3h4l-2-3ZM8.5 16.5h7" />
  </svg>
);

export const ChevronIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const AwardIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="m8.8 13.5-1.6 7 4.8-2.7 4.8 2.7-1.6-7" />
  </svg>
);

export const SteamIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M7 4c-1 1.5-1 3 0 4.5M12 3c-1 1.7-1 3.3 0 5M17 4c-1 1.5-1 3 0 4.5" />
    <path d="M4.5 13h15l-.9 5.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8L4.5 13Z" />
  </svg>
);
