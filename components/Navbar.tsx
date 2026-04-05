"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const links = [
  { label: "Home",     href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About",    href: "/about" },
  { label: "Contact",  href: "/contact" },
];

function SmokeY() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;

    const yTop = 120;
    const yMid = 140;
    const yBot = 180;

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      life: number; maxLife: number;
      size: number;
      wobble: number; wobbleSpeed: number;
      reset: () => void;
    };

    const makeParticle = (): Particle => {
      const p: Particle = {
        x: 0, y: 0, vx: 0, vy: 0,
        life: 0, maxLife: 0, size: 0,
        wobble: 0, wobbleSpeed: 0,
        reset() {
          this.x = cx + (Math.random() - 0.5) * 16;
          this.y = yTop;
          this.vx = (Math.random() - 0.5) * 0.4;
          this.vy = -(Math.random() * 0.8 + 0.35);
          this.life = 0;
          this.maxLife = 140 + Math.random() * 80;
          this.size = 8 + Math.random() * 14;
          this.wobble = Math.random() * Math.PI * 2;
          this.wobbleSpeed = 0.01 + Math.random() * 0.01;
        },
      };
      p.reset();
      p.life = Math.random() * p.maxLife;
      return p;
    };

    const particles = Array.from({ length: 55 }, makeParticle);
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        const t = p.life / p.maxLife;
        const distFromCenter = Math.abs(p.x - cx) / (W * 0.5);
        const edgeFade = Math.max(0, 1 - distFromCenter * 1.4);
        const alpha =
          (t < 0.15  ? (t / 0.15) * 0.18
          : t > 0.70 ? ((1 - t) / 0.30) * 0.18
          : 0.18) * edgeFade;

        const size = p.size * (0.3 + t * 1.5);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
        grad.addColorStop(0,   `rgba(140,138,133,${alpha})`);
        grad.addColorStop(0.6, `rgba(125,123,118,${alpha * 0.4})`);
        grad.addColorStop(1,   `rgba(110,108,103,0)`);

        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();

        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 0.28;
        p.y += p.vy;
        p.vy *= 0.997;
        p.size += 0.06;
        p.life++;
        if (p.life >= p.maxLife) p.reset();
      }

      ctx.save();
      ctx.strokeStyle = "#111110";
      ctx.lineWidth = 1.8;
      ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(cx - 13, yTop); ctx.lineTo(cx, yMid); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + 13, yTop); ctx.lineTo(cx, yMid); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, yMid);       ctx.lineTo(cx, yBot); ctx.stroke();
      ctx.restore();

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div style={{ position: "relative", width: 36, height: 40, overflow: "visible" }}>
      <canvas
        ref={canvasRef}
        width={100}
        height={160}
        style={{
          position: "absolute",
          top: -112,
          left: -32,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-12 border-b border-[#E4E3DF] bg-[rgba(249,248,246,0.88)] backdrop-blur-md"
      style={{ overflow: "visible" }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center" }}>
        <SmokeY />
      </Link>

      <ul className="flex gap-9 list-none">
        {links.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`text-[13px] uppercase tracking-widest transition-colors duration-200 ${
                  isActive
                    ? "text-[#111110]"
                    : "text-[#8A8984] hover:text-[#111110]"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}