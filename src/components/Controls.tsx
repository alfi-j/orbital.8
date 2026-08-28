import { SPEED_PRESETS } from "../data/planets";

interface ControlsProps {
  playing: boolean;
  speed: number;
  showLabels: boolean;
  onTogglePlay: () => void;
  onSpeed: (s: number) => void;
  onToggleLabels: () => void;
  onReset: () => void;
}

export default function Controls({
  playing,
  speed,
  showLabels,
  onTogglePlay,
  onSpeed,
  onToggleLabels,
  onReset,
}: ControlsProps) {
  return (
    <div className="pointer-events-auto absolute inset-x-3 bottom-3 z-20 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-white/10 bg-[#0a1024]/92 px-3.5 py-2.5 shadow-[0_16px_44px_rgba(0,0,0,0.5)] backdrop-blur-md md:inset-x-auto md:left-5 md:max-w-[calc(100%-390px)]">
      {/* Reproducir / pausar */}
      <button
        onClick={onTogglePlay}
        className={`group flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all ${
          playing
            ? "bg-solar text-[#241703] shadow-[0_0_22px_rgba(255,194,75,0.45)] hover:shadow-[0_0_30px_rgba(255,194,75,0.65)]"
            : "border border-white/20 text-ink hover:border-solar hover:text-solar"
        }`}
        aria-label={playing ? "Pausar simulación" : "Reproducir simulación"}
        title={playing ? "Pausar" : "Reproducir"}
      >
        {playing ? (
          <svg width="15" height="16" viewBox="0 0 15 16" fill="currentColor" aria-hidden="true">
            <rect x="1.5" y="1" width="4.4" height="14" rx="1.2" />
            <rect x="9.1" y="1" width="4.4" height="14" rx="1.2" />
          </svg>
        ) : (
          <svg width="15" height="16" viewBox="0 0 15 16" fill="currentColor" aria-hidden="true">
            <path d="M2.5 1.6c0-.8.9-1.3 1.6-.9l10 6.4c.6.4.6 1.4 0 1.8l-10 6.4c-.7.4-1.6-.1-1.6-.9V1.6z" />
          </svg>
        )}
      </button>

      {/* Reiniciar */}
      <button
        onClick={onReset}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-ink-dim transition hover:rotate-[-40deg] hover:border-white/35 hover:text-ink"
        aria-label="Reiniciar órbitas"
        title="Reiniciar órbitas"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 1.8v3h-3"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <span className="hidden h-6 w-px bg-white/10 sm:block" aria-hidden="true" />

      {/* Velocidad */}
      <div className="flex items-center gap-1.5" role="group" aria-label="Velocidad de la simulación">
        <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">Velocidad</span>
        {SPEED_PRESETS.map((s) => {
          const active = speed === s;
          return (
            <button
              key={s}
              onClick={() => onSpeed(s)}
              className={`rounded-md px-2 py-1 text-[12px] font-semibold tabular-nums transition-all ${
                active
                  ? "bg-solar/15 text-solar shadow-[inset_0_0_0_1px_rgba(255,194,75,0.5)]"
                  : "text-ink-dim hover:bg-white/5 hover:text-ink"
              }`}
              aria-pressed={active}
            >
              {s.toLocaleString("es-ES")}×
            </button>
          );
        })}
      </div>

      <span className="hidden h-6 w-px bg-white/10 sm:block" aria-hidden="true" />

      {/* Etiquetas */}
      <button
        onClick={onToggleLabels}
        className="flex items-center gap-2"
        role="switch"
        aria-checked={showLabels}
        aria-label="Mostrar nombres de los planetas"
      >
        <span
          className={`relative h-5 w-9 rounded-full transition-colors ${showLabels ? "bg-solar" : "bg-white/12"}`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
              showLabels ? "left-[18px]" : "left-0.5"
            }`}
          />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">Nombres</span>
      </button>
    </div>
  );
}
