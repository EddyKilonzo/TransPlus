import { useEffect, useRef } from "react";

const R = 26;
const HEX_W = Math.sqrt(3) * R;
const ROW_H = 1.5 * R;
const INFLUENCE = 130;
const DECAY = 0.9;

type Cell = { x: number; y: number; base: number; energy: number };

function hexPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 180) * (60 * i - 90);
    const px = cx + r * Math.cos(a);
    const py = cy + r * Math.sin(a);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

export default function HexBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cells: Cell[] = [];
    let dpr = 1;
    let raf = 0;
    const pointer = { x: -9999, y: -9999 };

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cells = [];
      const rows = Math.ceil(h / ROW_H) + 2;
      const cols = Math.ceil(w / HEX_W) + 2;
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * HEX_W + (row % 2 ? HEX_W / 2 : 0);
          const y = row * ROW_H;
          // sparse ambient scatter — a few cells sit brighter than the rest
          const r = Math.random();
          const base = r > 0.97 ? 0.115 : r > 0.9 ? 0.072 : 0.042;
          cells.push({ x, y, base, energy: 0 });
        }
      }
    };

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      for (const c of cells) {
        if (!reduced) {
          const dx = c.x - pointer.x;
          const dy = c.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < INFLUENCE) {
            const target = (1 - dist / INFLUENCE) ** 2;
            if (target > c.energy) c.energy = target;
          }
          c.energy *= DECAY;
          if (c.energy < 0.002) c.energy = 0;
        }

        const alpha = c.base + c.energy * 0.26;
        if (alpha <= 0.003) continue;

        // ambient cells read as neutral ink; energised cells shift toward moss
        const t = Math.min(c.energy * 1.2, 1);
        const rr = Math.round(14 + (63 - 14) * t);
        const gg = Math.round(18 + (166 - 18) * t);
        const bb = Math.round(15 + (107 - 15) * t);

        ctx.fillStyle = `rgba(${rr},${gg},${bb},${alpha})`;
        hexPath(ctx, c.x, c.y, R * 0.88);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    build();
    draw();
    window.addEventListener("resize", build);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden mask-fade-y">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
