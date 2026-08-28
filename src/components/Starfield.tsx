import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  phase: number;
  speed: number;
  hue: string;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stars: Star[] = [];
    const hues = ["#FFFFFF", "#CFE0FF", "#FFE9C4", "#C4F5EC"];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(260, Math.floor((window.innerWidth * window.innerHeight) / 6500));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.55 + 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 1.4 + 0.4,
        hue: hues[Math.floor(Math.random() * hues.length)],
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const time = t / 1000;
      for (const s of stars) {
        const alpha = s.baseAlpha * (0.55 + 0.45 * Math.sin(time * s.speed + s.phase));
        ctx.globalAlpha = Math.max(0.05, alpha);
        ctx.fillStyle = s.hue;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#04070f]" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Ambient nebula layers */}
      <div
        className="nebula-a absolute -top-[20%] -left-[15%] h-[70vh] w-[70vw] rounded-full opacity-[0.16] blur-[110px]"
        style={{ background: "radial-gradient(circle, #1b4b63 0%, transparent 65%)" }}
      />
      <div
        className="nebula-b absolute top-[35%] -right-[18%] h-[75vh] w-[65vw] rounded-full opacity-[0.14] blur-[120px]"
        style={{ background: "radial-gradient(circle, #63451b 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-[-25%] left-[20%] h-[60vh] w-[55vw] rounded-full opacity-[0.1] blur-[110px]"
        style={{ background: "radial-gradient(circle, #274a3a 0%, transparent 65%)" }}
      />
    </div>
  );
}
