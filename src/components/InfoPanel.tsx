import { PLANETS, fmt, type CelestialBody } from "../data/planets";

interface InfoPanelProps {
  body: CelestialBody;
  onClose: () => void;
  onJump: (id: string) => void;
}

const JUPITER_D = 139820;

function orbStyle(b: CelestialBody) {
  return {
    background: `radial-gradient(circle at 32% 28%, ${b.colors.light}, ${b.colors.base} 55%, ${b.colors.dark})`,
    boxShadow: `0 0 32px ${b.colors.base}55, inset -6px -8px 14px rgba(0,0,0,0.35)`,
  };
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-white/6 bg-white/[0.03] px-3 py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">{label}</p>
      <p className="mt-0.5 text-[15px] font-semibold leading-tight text-ink tabular-nums">{value}</p>
      {sub && <p className="text-[11px] text-ink-dim tabular-nums">{sub}</p>}
    </div>
  );
}

export default function InfoPanel({ body, onClose, onJump }: InfoPanelProps) {
  const isSun = body.id === "sol";
  const relSize = Math.max(2.5, (body.stats.diameterKm / JUPITER_D) * 100);

  return (
    <aside
      key={body.id}
      className="panel-enter pointer-events-auto absolute inset-x-3 bottom-[128px] z-20 max-h-[52%] overflow-y-auto rounded-xl border border-white/10 bg-[#0a1024]/95 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-md md:inset-x-auto md:bottom-auto md:right-5 md:top-5 md:max-h-[calc(100%-40px)] md:w-[350px]"
      aria-label={`Ficha de ${body.name}`}
    >
      <div className="p-5">
        {/* Cabecera */}
        <div className="flex items-start gap-4">
          <span className="mt-0.5 inline-block h-16 w-16 shrink-0 rounded-full" style={orbStyle(body)} aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: body.colors.base }}>
              {body.type}
            </p>
            <h2 className="font-display text-2xl font-bold leading-tight text-ink">{body.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-md border border-white/10 p-1.5 text-ink-dim transition hover:border-white/25 hover:text-ink"
            aria-label="Cerrar ficha"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-dim">{body.description}</p>

        {/* Datos clave */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Stat label="Diámetro" value={`${fmt(body.stats.diameterKm)} km`} />
          {isSun ? (
            <Stat label="Posición" value="Centro del sistema" sub="0 UA" />
          ) : (
            <Stat
              label="Distancia al Sol"
              value={`${fmt(body.stats.distanceMkm)} M km`}
              sub={`${fmt(body.stats.distanceAU)} unidades astronómicas`}
            />
          )}
          {!isSun && <Stat label="Período orbital" value={body.stats.orbitLabel} sub="duración de su año" />}
          <Stat label={isSun ? "Rotación" : "Duración del día"} value={body.stats.dayLabel} />
          <Stat label={isSun ? "Planetas en órbita" : "Lunas conocidas"} value={String(isSun ? 8 : body.stats.moons)} />
          <Stat label="Temperatura" value={body.stats.tempLabel} />
        </div>

        {/* Tamaño relativo */}
        {!isSun && (
          <div className="mt-4">
            <div className="flex items-baseline justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-faint">Tamaño relativo</p>
              <p className="text-[11px] text-ink-dim tabular-nums">
                {relSize >= 99 ? "referencia" : `${fmt(relSize)} % de Júpiter`}
              </p>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="bar-fill h-full rounded-full"
                style={{ width: `${relSize}%`, background: `linear-gradient(90deg, ${body.colors.dark}, ${body.colors.base})` }}
              />
            </div>
          </div>
        )}

        {/* Curiosidad */}
        <div className="mt-4 flex gap-3 rounded-lg border border-dashed border-white/15 bg-white/[0.03] p-3.5">
          <svg className="mt-0.5 shrink-0" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M9 1.5l1.6 4.4 4.4 1.6-4.4 1.6L9 13.5 7.4 9.1 3 7.5l4.4-1.6L9 1.5z"
              fill={body.colors.base}
              opacity="0.9"
            />
            <circle cx="14.6" cy="13.8" r="1.4" fill={body.colors.base} opacity="0.55" />
            <circle cx="3.6" cy="14.4" r="1" fill={body.colors.base} opacity="0.4" />
          </svg>
          <p className="text-[12.5px] leading-relaxed text-ink-dim">
            <span className="font-semibold text-ink">¿Sabías que…? </span>
            {body.fact}
          </p>
        </div>

        {/* Salto rápido entre planetas */}
        <div className="mt-4 flex items-center justify-between border-t border-white/8 pt-3.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">Saltar a</span>
          <div className="flex items-center gap-1.5">
            {PLANETS.map((p) => (
              <button
                key={p.id}
                onClick={() => onJump(p.id)}
                title={p.name}
                aria-label={`Ver ${p.name}`}
                className={`h-3.5 w-3.5 rounded-full transition-transform hover:scale-125 ${
                  body.id === p.id ? "ring-2 ring-white/70 ring-offset-2 ring-offset-[#0a1024]" : ""
                }`}
                style={{ background: `radial-gradient(circle at 32% 28%, ${p.colors.light}, ${p.colors.base} 60%, ${p.colors.dark})` }}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
