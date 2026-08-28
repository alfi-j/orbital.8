import { memo } from "react";
import { PLANETS, fmt } from "../data/planets";
import Reveal from "./Reveal";

interface PlanetGridProps {
  onExplore: (id: string) => void;
}

function PlanetGrid({ onExplore }: PlanetGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {PLANETS.map((p, i) => (
        <Reveal key={p.id} delay={(i % 4) * 90} as="article">
          <div
            className="group flex h-full flex-col rounded-xl border border-white/8 bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
          >
            <div className="flex items-center gap-3.5">
              <span
                className="inline-block h-12 w-12 shrink-0 rounded-full transition-transform duration-500 group-hover:rotate-[25deg] group-hover:scale-110"
                style={{
                  background: `radial-gradient(circle at 32% 28%, ${p.colors.light}, ${p.colors.base} 55%, ${p.colors.dark})`,
                  boxShadow: `0 0 22px ${p.colors.base}44`,
                }}
                aria-hidden="true"
              />
              <div>
                <h3 className="font-display text-[17px] font-bold text-ink">{p.name}</h3>
                <p className="text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: p.colors.base }}>
                  {p.type}
                </p>
              </div>
            </div>

            <dl className="mt-4 space-y-2 text-[13px]">
              <div className="flex justify-between gap-3 border-b border-white/5 pb-1.5">
                <dt className="text-ink-faint">Diámetro</dt>
                <dd className="font-semibold text-ink tabular-nums">{fmt(p.stats.diameterKm)} km</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-white/5 pb-1.5">
                <dt className="text-ink-faint">Distancia al Sol</dt>
                <dd className="font-semibold text-ink tabular-nums">{fmt(p.stats.distanceMkm)} M km</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink-faint">Período orbital</dt>
                <dd className="font-semibold text-ink">{p.stats.orbitLabel}</dd>
              </div>
            </dl>

            <button
              onClick={() => onExplore(p.id)}
              className="mt-5 inline-flex items-center gap-2 self-start text-[12.5px] font-semibold text-ink-dim transition-colors hover:text-solar! group-hover:text-solar"
            >
              Ver en órbita
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M1 5h11M8.5 1.5L12.5 5l-4 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default memo(PlanetGrid);
