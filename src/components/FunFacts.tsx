import { FUN_FACTS } from "../data/planets";
import { PLANETS } from "../data/planets";

function Spark({ color }: { color: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mx-6 shrink-0" aria-hidden="true">
      <path d="M6 0.8l1.2 3.6 3.6 1.2-3.6 1.2L6 10.4 4.8 6.8 1.2 5.6l3.6-1.2L6 0.8z" fill={color} />
    </svg>
  );
}

export default function FunFacts() {
  const items = [...FUN_FACTS, ...FUN_FACTS];
  return (
    <div className="relative overflow-hidden border-y border-white/8 bg-white/[0.02] py-4">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: "linear-gradient(90deg, #04070f, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: "linear-gradient(-90deg, #04070f, transparent)" }}
      />
      <div className="marquee-track flex w-max items-center">
        {items.map((fact, i) => (
          <span key={i} className="flex items-center whitespace-nowrap text-[13px] text-ink-dim">
            <Spark color={PLANETS[i % PLANETS.length].colors.base} />
            {fact}
          </span>
        ))}
      </div>
    </div>
  );
}
