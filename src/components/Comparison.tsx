import type { CSSProperties } from "react";
import { PLANETS, fmt } from "../data/planets";
import Reveal from "./Reveal";

const MAX_PERIOD_DAYS = Math.log10(60190);

function barStyle(pct: number, color: string): CSSProperties {
  return { "--target": `${Math.max(2.5, pct)}%`, background: color } as CSSProperties;
}

function Row({
  name,
  pct,
  color,
  value,
}: {
  name: string;
  pct: number;
  color: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-[74px] shrink-0 text-right text-[12.5px] font-medium text-ink-dim">{name}</span>
      <div className="h-[11px] flex-1 overflow-hidden rounded-full bg-white/[0.05]">
        <div
          className="bar-fill h-full w-0 rounded-full"
          style={barStyle(pct, `linear-gradient(90deg, ${color}88, ${color})`)}
        />
      </div>
      <span className="w-[92px] shrink-0 text-[12px] font-semibold text-ink tabular-nums">{value}</span>
    </div>
  );
}

export default function Comparison() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Reveal>
        <div className="h-full rounded-xl border border-white/8 bg-white/[0.025] p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-solar">Escala de tamaños</p>
          <h3 className="font-display mt-1 text-lg font-bold text-ink">Diámetro ecuatorial</h3>
          <p className="mt-1 text-[12.5px] text-ink-faint">Júpiter marca el 100 % de la barra. El Sol mediría 10 barras.</p>
          <div className="mt-5 space-y-2.5">
            {PLANETS.map((p) => (
              <Row
                key={p.id}
                name={p.name}
                pct={(p.stats.diameterKm / 139820) * 100}
                color={p.colors.base}
                value={`${fmt(p.stats.diameterKm)} km`}
              />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="h-full rounded-xl border border-white/8 bg-white/[0.025] p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-solar">Escala de tiempo</p>
          <h3 className="font-display mt-1 text-lg font-bold text-ink">Duración del año</h3>
          <p className="mt-1 text-[12.5px] text-ink-faint">Escala logarítmica: cada salto multiplica el período, no lo suma.</p>
          <div className="mt-5 space-y-2.5">
            {PLANETS.map((p) => (
              <Row
                key={p.id}
                name={p.name}
                pct={(Math.log10(p.stats.orbitDays) / MAX_PERIOD_DAYS) * 100}
                color={p.colors.base}
                value={p.stats.orbitLabel}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
