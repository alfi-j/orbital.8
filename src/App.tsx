import { useCallback, useMemo, useRef, useState } from "react";
import Starfield from "./components/Starfield";
import SolarSystem from "./components/SolarSystem";
import InfoPanel from "./components/InfoPanel";
import Controls from "./components/Controls";
import PlanetGrid from "./components/PlanetGrid";
import Comparison from "./components/Comparison";
import FunFacts from "./components/FunFacts";
import Reveal from "./components/Reveal";
import { ALL_BODIES } from "./data/planets";

function LogoMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <circle cx="17" cy="17" r="6" fill="#FFC24B" />
      <circle cx="17" cy="17" r="6" fill="url(#logo-glow)" opacity="0.7" />
      <ellipse cx="17" cy="17" rx="15" ry="6" stroke="#58C7F0" strokeWidth="1.5" transform="rotate(-18 17 17)" />
      <circle cx="28.6" cy="10.4" r="2" fill="#58C7F0" />
      <defs>
        <radialGradient id="logo-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE9B0" />
          <stop offset="100%" stopColor="#FF9838" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function formatSimTime(years: number): string {
  if (years < 1) {
    const days = Math.floor(years * 365.25);
    return `${days.toLocaleString("es-ES")} días`;
  }
  return `${years.toLocaleString("es-ES", { maximumFractionDigits: 1 })} años`;
}

export default function App() {
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [resetToken, setResetToken] = useState(0);
  const [simYears, setSimYears] = useState(0);
  const simRef = useRef<HTMLElement>(null);

  const selectedBody = useMemo(
    () => ALL_BODIES.find((b) => b.id === selectedId) ?? null,
    [selectedId]
  );
  const hoveredBody = useMemo(
    () => ALL_BODIES.find((b) => b.id === hoverId) ?? null,
    [hoverId]
  );

  const handleExplore = useCallback((id: string) => {
    setSelectedId(id);
    simRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleReset = useCallback(() => {
    setResetToken((t) => t + 1);
  }, []);

  return (
    <div className="min-h-screen font-body">
      <Starfield />

      {/* ---------- Cabecera ---------- */}
      <header className="sticky top-0 z-30 border-b border-white/6 bg-[#04070f]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-3">
            <LogoMark />
            <div className="leading-tight">
              <p className="font-display text-[15px] font-bold tracking-wide text-ink">
                ORBITAL<span className="text-solar">·</span>8
              </p>
              <p className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-ink-faint">
                Explorador del sistema solar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="text-right leading-tight">
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                Tiempo simulado
              </p>
              <p className="text-[15px] font-bold text-ink tabular-nums sm:text-[17px]">
                {formatSimTime(simYears)}
              </p>
            </div>
            <span
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                playing
                  ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                  : "border-amber-400/30 bg-amber-400/10 text-amber-300"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${playing ? "blink-dot bg-emerald-400" : "bg-amber-400"}`} />
              {playing ? "En marcha" : "Pausado"}
            </span>
          </div>
        </div>
      </header>

      {/* ---------- Simulador ---------- */}
      <section
        ref={simRef}
        id="simulador"
        className="relative mx-auto h-[78vh] min-h-[580px] max-h-[860px] w-full max-w-[1400px] scroll-mt-14 px-2 pt-2 sm:px-4"
        aria-label="Simulador orbital"
      >
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/8 bg-[radial-gradient(ellipse_at_center,rgba(20,30,64,0.5),rgba(4,7,15,0.9))_70%]">
          <SolarSystem
            playing={playing}
            speed={speed}
            selectedId={selectedId}
            hoverId={hoverId}
            showLabels={showLabels}
            resetToken={resetToken}
            onSelect={setSelectedId}
            onHover={setHoverId}
            onTick={setSimYears}
          />

          {/* Nota de escala */}
          <div className="pointer-events-none absolute left-4 top-3.5 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-[#0a1024]/80 px-3 py-1.5 backdrop-blur-sm">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="4.6" stroke="#8E9CC6" strokeWidth="1.3" />
              <path d="M6 3.6V6l1.8 1.2" stroke="#8E9CC6" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-ink-dim">
              Tamaños y distancias no a escala
            </span>
          </div>

          {/* Chip de hover */}
          {hoveredBody && hoveredBody.id !== selectedId && (
            <div
              key={hoveredBody.id}
              className="chip-enter pointer-events-none absolute left-1/2 top-3.5 z-10 flex items-center gap-2 rounded-full border border-white/12 bg-[#0a1024]/90 px-3.5 py-1.5 backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full" style={{ background: hoveredBody.colors.base }} />
              <span className="text-[12px] font-semibold text-ink">{hoveredBody.name}</span>
              <span className="text-[11px] text-ink-faint">— clic para explorar</span>
            </div>
          )}

          {/* Pista inicial */}
          {!selectedBody && (
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 translate-y-[180px] text-center sm:translate-y-[210px]">
              <p className="rounded-full border border-dashed border-white/20 bg-[#0a1024]/70 px-4 py-2 text-[12px] text-ink-dim backdrop-blur-sm">
                Haz clic en el <span className="font-semibold text-solar">Sol</span> o en cualquier{" "}
                <span className="font-semibold text-ink">planeta</span> para ver su ficha
              </p>
            </div>
          )}

          <Controls
            playing={playing}
            speed={speed}
            showLabels={showLabels}
            onTogglePlay={() => setPlaying((p) => !p)}
            onSpeed={setSpeed}
            onToggleLabels={() => setShowLabels((l) => !l)}
            onReset={handleReset}
          />

          {selectedBody && (
            <InfoPanel body={selectedBody} onClose={() => setSelectedId(null)} onJump={setSelectedId} />
          )}
        </div>
      </section>

      {/* ---------- Guía de planetas ---------- */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        <section className="pt-20" aria-label="Guía de planetas">
          <Reveal>
            <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-solar">Guía de bolsillo</p>
                <h2 className="font-display mt-2 text-3xl font-bold text-ink sm:text-4xl">Los ocho mundos</h2>
              </div>
              <p className="max-w-md text-[14px] leading-relaxed text-ink-dim">
                Del tostado Mercurio al gélido Neptuno: cada ficha resume lo esencial. Pulsa{" "}
                <span className="font-semibold text-ink">«Ver en órbita»</span> para localizarlo en el simulador.
              </p>
            </div>
          </Reveal>
          <PlanetGrid onExplore={handleExplore} />
        </section>

        {/* ---------- Comparativa ---------- */}
        <section className="pt-24" aria-label="Comparativa de planetas">
          <Reveal>
            <div className="mb-9">
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-solar">Cara a cara</p>
              <h2 className="font-display mt-2 text-3xl font-bold text-ink sm:text-4xl">¿Quién es quién?</h2>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-ink-dim">
                Los números crudos engañan: Júpiter aplasta la tabla de diámetros y Neptuno se dispara en la de
                tiempo. Observa cómo crecen las barras al entrar en pantalla.
              </p>
            </div>
          </Reveal>
          <Comparison />
        </section>

        {/* ---------- Curiosidades ---------- */}
        <section className="pt-24" aria-label="Curiosidades">
          <Reveal>
            <div className="mb-8 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-solar">Mientras orbitas</p>
              <h2 className="font-display mt-2 text-3xl font-bold text-ink sm:text-4xl">Datos para presumir</h2>
              <p className="mt-3 text-[13px] text-ink-faint">Pasa el cursor sobre la cinta para pausarla.</p>
            </div>
          </Reveal>
        </section>
      </main>

      <FunFacts />

      {/* ---------- Pie ---------- */}
      <footer className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/6 pt-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <p className="text-[12.5px] text-ink-dim">
              <span className="font-display font-bold text-ink">ORBITAL·8</span> — aprender mirando hacia arriba.
            </p>
          </div>
          <p className="text-center text-[11.5px] leading-relaxed text-ink-faint sm:text-right">
            Datos aproximados basados en NASA / IAU.
            <br />
            Los períodos orbitales conservan sus proporciones reales entre sí.
          </p>
        </div>
      </footer>
    </div>
  );
}
