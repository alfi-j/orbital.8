import { useEffect, useRef, useState } from "react";
import { PLANETS, SUN, EARTH_ORBIT_SECONDS, type CelestialBody } from "../data/planets";

interface SolarSystemProps {
  playing: boolean;
  speed: number;
  selectedId: string | null;
  hoverId: string | null;
  showLabels: boolean;
  resetToken: number;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onTick: (years: number) => void;
}

const INITIAL_ANGLES: Record<string, number> = {
  mercurio: -0.9,
  venus: -0.15,
  tierra: 0.75,
  marte: 1.65,
  jupiter: 2.85,
  saturno: 3.9,
  urano: 5.0,
  neptuno: 5.85,
};

export default function SolarSystem({
  playing,
  speed,
  selectedId,
  hoverId,
  showLabels,
  resetToken,
  onSelect,
  onHover,
  onTick,
}: SolarSystemProps) {
  const anglesRef = useRef<Record<string, number>>({ ...INITIAL_ANGLES });
  const simYearsRef = useRef(0);
  const playingRef = useRef(playing);
  const speedRef = useRef(speed);
  const onTickRef = useRef(onTick);
  const [, setFrame] = useState(0);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);
  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    anglesRef.current = { ...INITIAL_ANGLES };
    simYearsRef.current = 0;
    onTickRef.current(0);
    setFrame((f) => f + 1);
  }, [resetToken]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      if (playingRef.current) {
        const s = speedRef.current;
        for (const p of PLANETS) {
          const omega = (Math.PI * 2) / (p.periodYears * EARTH_ORBIT_SECONDS);
          anglesRef.current[p.id] += dt * s * omega;
        }
        simYearsRef.current += (dt * s) / EARTH_ORBIT_SECONDS;
        onTickRef.current(simYearsRef.current);
        setFrame((f) => f + 1);
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pos = (p: CelestialBody) => {
    const a = anglesRef.current[p.id];
    return { x: Math.cos(a) * p.orbitR, y: Math.sin(a) * p.orbitR };
  };

  const earthPos = pos(PLANETS[2]);
  const moonAngle = anglesRef.current["tierra"] * 13.37;

  return (
    <svg
      viewBox="-520 -520 1040 1040"
      className="h-full w-full select-none"
      role="img"
      aria-label="Simulación orbital del sistema solar"
    >
      <defs>
        <radialGradient id="grad-sol" cx="38%" cy="35%" r="75%">
          <stop offset="0%" stopColor={SUN.colors.light} />
          <stop offset="55%" stopColor={SUN.colors.base} />
          <stop offset="100%" stopColor={SUN.colors.dark} />
        </radialGradient>
        {PLANETS.map((p) => (
          <radialGradient key={p.id} id={`grad-${p.id}`} cx="32%" cy="28%" r="80%">
            <stop offset="0%" stopColor={p.colors.light} />
            <stop offset="55%" stopColor={p.colors.base} />
            <stop offset="100%" stopColor={p.colors.dark} />
          </radialGradient>
        ))}
        <radialGradient id="glow-sol" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFC24B" stopOpacity="0.5" />
          <stop offset="45%" stopColor="#FF9838" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FF9838" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow-comet" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DFF3FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8FC7F0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="comet-tail" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#CFEBFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#CFEBFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Órbitas */}
      {PLANETS.map((p) => {
        const active = selectedId === p.id;
        const hovered = selectedId !== p.id && hoverId === p.id;
        return (
          <circle
            key={`orbit-${p.id}`}
            cx={0}
            cy={0}
            r={p.orbitR}
            fill="none"
            stroke={active || hovered ? p.colors.base : "#243361"}
            strokeOpacity={active ? 0.9 : hovered ? 0.65 : 0.5}
            strokeWidth={active ? 1.6 : 1}
            strokeDasharray={active ? "4 10" : undefined}
            className={active ? "orbit-active" : undefined}
            style={{ transition: "stroke 0.3s, stroke-opacity 0.3s" }}
          />
        );
      })}

      {/* Cinturón de asteroides */}
      <g className="asteroid-belt" pointerEvents="none">
        <circle cx={0} cy={0} r={254} fill="none" stroke="#3C4A7C" strokeWidth={2.5} strokeDasharray="1.5 9" opacity={0.45} />
        <circle cx={0} cy={0} r={266} fill="none" stroke="#3C4A7C" strokeWidth={1.6} strokeDasharray="1 11" opacity={0.35} />
      </g>

      {/* Cometa decorativo */}
      <g pointerEvents="none">
        <g>
          <polygon points="-8,0 -64,5 -64,-5" fill="url(#comet-tail)" />
          <circle cx={0} cy={0} r={9} fill="url(#glow-comet)" />
          <circle cx={0} cy={0} r={3} fill="#EAF7FF" />
          <animateMotion
            dur="24s"
            repeatCount="indefinite"
            rotate="auto"
            path="M -620,240 C -280,-320 320,-300 640,180"
          />
        </g>
      </g>

      {/* Sol */}
      <g
        className="planet-group"
        onClick={() => onSelect(SUN.id)}
        onPointerEnter={() => onHover(SUN.id)}
        onPointerLeave={() => onHover(null)}
      >
        <circle cx={0} cy={0} r={110} fill="url(#glow-sol)" pointerEvents="none" />
        <circle cx={0} cy={0} r={64} fill="url(#glow-sol)" className="sun-corona" pointerEvents="none" />
        <ellipse cx={0} cy={0} rx={52} ry={44} fill="url(#glow-sol)" className="sun-flare" pointerEvents="none" />
        <circle cx={0} cy={0} r={SUN.size} fill="url(#grad-sol)" />
        {selectedId === SUN.id && (
          <circle cx={0} cy={0} r={SUN.size + 9} fill="none" stroke={SUN.colors.base} strokeWidth={1.6} strokeDasharray="4 7" className="selection-ring" />
        )}
        <circle cx={0} cy={0} r={SUN.size + 12} fill="rgba(0,0,0,0)" pointerEvents="all" />
        {(showLabels || selectedId === SUN.id || hoverId === SUN.id) && (
          <text x={0} y={SUN.size + 24} textAnchor="middle" fill="#F5D488" fontSize={13} letterSpacing={2} fontFamily="Space Grotesk">
            SOL
          </text>
        )}
      </g>

      {/* Planetas */}
      {PLANETS.map((p) => {
        const { x, y } = pos(p);
        const selected = selectedId === p.id;
        const showLabel = showLabels || selected || hoverId === p.id;
        return (
          <g
            key={p.id}
            className="planet-group"
            onClick={() => onSelect(p.id)}
            onPointerEnter={() => onHover(p.id)}
            onPointerLeave={() => onHover(null)}
          >
            {/* halo */}
            <circle cx={x} cy={y} r={p.size * 2.4} fill={p.colors.base} opacity={selected ? 0.16 : 0.07} pointerEvents="none" style={{ transition: "opacity 0.3s" }} />

            {/* anillos de Saturno */}
            {p.ring && (
              <g transform={`rotate(-16 ${x} ${y})`} pointerEvents="none">
                <ellipse cx={x} cy={y} rx={p.size * 1.9} ry={p.size * 0.62} fill="none" stroke={p.ring.inner} strokeWidth={5} opacity={0.75} />
                <ellipse cx={x} cy={y} rx={p.size * 1.55} ry={p.size * 0.48} fill="none" stroke={p.ring.outer} strokeWidth={2.5} opacity={0.55} />
              </g>
            )}

            <circle cx={x} cy={y} r={p.size} fill={`url(#grad-${p.id})`} />

            {/* banda ecuatorial sutil para gigantes */}
            {(p.id === "jupiter" || p.id === "saturno") && (
              <ellipse cx={x} cy={y + p.size * 0.18} rx={p.size * 0.92} ry={p.size * 0.2} fill={p.colors.dark} opacity={0.28} pointerEvents="none" />
            )}

            {selected && (
              <circle cx={x} cy={y} r={p.size + 8} fill="none" stroke={p.colors.base} strokeWidth={1.5} strokeDasharray="4 7" className="selection-ring" pointerEvents="none" />
            )}

            {/* zona de clic generosa */}
            <circle cx={x} cy={y} r={Math.max(p.size + 10, 17)} fill="rgba(0,0,0,0)" pointerEvents="all" />

            {showLabel && (
              <text
                x={x}
                y={y + p.size + 20}
                textAnchor="middle"
                fill={selected ? p.colors.light : "#8E9CC6"}
                fontSize={12.5}
                letterSpacing={2}
                fontFamily="Space Grotesk"
                pointerEvents="none"
              >
                {p.name.toUpperCase()}
              </text>
            )}
          </g>
        );
      })}

      {/* Luna de la Tierra (decorativa) */}
      <circle
        cx={earthPos.x + Math.cos(moonAngle) * 19}
        cy={earthPos.y + Math.sin(moonAngle) * 19}
        r={2.6}
        fill="#C9CFDD"
        opacity={0.9}
        pointerEvents="none"
      />
    </svg>
  );
}
