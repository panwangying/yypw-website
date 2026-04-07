"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function IntroPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let angle = 0;
    let hovered = false;
    let clicked = false;
    let enterScale = 0;
    let fadeOut = 0;
    let animId: number;
    let lastInkTime = 0;

    const TEXT = "欢迎 · WELCOME · ようこそ · 환영 · BIENVENUE · WILLKOMMEN · BENVENUTO · BIENVENIDO · ";
    const RADIUS = 160;
    const SPHERE_R = 56;
    const PARTICLE_COUNT = 200;

    type InkBlob = {
      x: number; y: number;
      r: number; maxR: number;
      opacity: number; speed: number;
      vx: number; vy: number;
      born: number;
    };

    const inkBlobs: InkBlob[] = [];

    const spawnInk = () => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      inkBlobs.push({
        x: cx + (Math.random() - 0.5) * 80,
        y: cy + (Math.random() - 0.5) * 80,
        r: 2 + Math.random() * 8,
        maxR: 60 + Math.random() * 120,
        opacity: 0.06 + Math.random() * 0.08,
        speed: 0.4 + Math.random() * 0.6,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        born: Date.now(),
      });
      if (inkBlobs.length > 24) inkBlobs.shift();
    };

    const sphereParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const phi = Math.acos(1 - 2 * (i + 0.5) / PARTICLE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return { phi, theta };
    });

    const getCenter = () => ({
      cx: canvas.width / 2,
      cy: canvas.height / 2,
    });

    const onMouseMove = (e: MouseEvent) => {
      const { cx, cy } = getCenter();
      const mx = e.clientX - cx;
      const my = e.clientY - cy;
      hovered = Math.sqrt(mx * mx + my * my) < SPHERE_R + 12;
      canvas.style.cursor = hovered ? "pointer" : "default";
    };

    const onClick = (e: MouseEvent) => {
      const { cx, cy } = getCenter();
      const mx = e.clientX - cx;
      const my = e.clientY - cy;
      if (Math.sqrt(mx * mx + my * my) < SPHERE_R + 12) {
        for (let i = 0; i < 10; i++) spawnInk();
        clicked = true;
      }
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onClick);

    for (let i = 0; i < 6; i++) spawnInk();

    const draw = () => {
      const cw = canvas.width;
      const ch = canvas.height;
      const cx = cw / 2;
      const cy = ch / 2;

      ctx.fillStyle = "rgba(249,248,246,0.18)";
      ctx.fillRect(0, 0, cw, ch);

      if (clicked) {
        fadeOut += 0.025;
        if (fadeOut >= 1) {
          cancelAnimationFrame(animId);
          router.push("/home");
          return;
        }
      }

      const now = Date.now();
      if (now - lastInkTime > 600) {
        spawnInk();
        lastInkTime = now;
      }

      // 水墨团
      for (let i = inkBlobs.length - 1; i >= 0; i--) {
        const b = inkBlobs[i];
        b.r = Math.min(b.r + b.speed, b.maxR);
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.995;
        b.vy *= 0.995;
        const progress = b.r / b.maxR;
        const alpha = b.opacity * (1 - progress) * (1 - fadeOut);
        if (alpha <= 0.002) { inkBlobs.splice(i, 1); continue; }

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0,   `rgba(30,26,22,${alpha * 1.2})`);
        grad.addColorStop(0.3, `rgba(50,44,38,${alpha * 0.8})`);
        grad.addColorStop(0.7, `rgba(80,74,68,${alpha * 0.3})`);
        grad.addColorStop(1,   `rgba(100,94,88,0)`);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.born * 0.001);
        ctx.scale(1, 0.6 + Math.sin(b.born * 0.002) * 0.3);
        ctx.beginPath();
        ctx.arc(0, 0, b.r * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20,18,16,${alpha * 0.6})`;
        ctx.fill();
        ctx.restore();
      }

      enterScale = Math.min(1, enterScale + 0.02);
      angle += hovered ? 0.006 : 0.014;

      ctx.globalAlpha = 1 - fadeOut;
      const s = enterScale * (1 + (hovered ? 0.05 : 0));

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(s, s);

      // 环绕文字
      const chars = TEXT.split("");
      const charAngle = (Math.PI * 2) / chars.length;
      ctx.save();
      ctx.rotate(angle * 0.5);
      chars.forEach((ch, i) => {
        const a = charAngle * i;
        const x = Math.cos(a) * RADIUS;
        const y = Math.sin(a) * RADIUS;
        const dist = Math.sin(a);
        const opacity = 0.3 + 0.5 * ((dist + 1) / 2);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(a + Math.PI / 2);
        ctx.font = `300 12px 'DM Sans', sans-serif`;
        ctx.fillStyle = `rgba(80,76,70,${opacity})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(ch, 0, 0);
        ctx.restore();
      });
      ctx.restore();

      // 3D 点阵球
      const tilt = 0.4;
      sphereParticles.forEach((p) => {
        const theta = p.theta + angle * 1.2;
        const x3 = SPHERE_R * Math.sin(p.phi) * Math.cos(theta);
        const y3 = SPHERE_R * Math.sin(p.phi) * Math.sin(theta);
        const z3 = SPHERE_R * Math.cos(p.phi);
        const y2 = y3 * Math.cos(tilt) - z3 * Math.sin(tilt);
        const z2 = y3 * Math.sin(tilt) + z3 * Math.cos(tilt);
        const depth = (z2 + SPHERE_R) / (2 * SPHERE_R);
        const r = 1.2 + depth * 1.6;
        const opacity = 0.12 + depth * 0.75;
        ctx.beginPath();
        ctx.arc(x3, y2, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(24,22,20,${opacity})`;
        ctx.fill();
      });

     

    

      ctx.restore();
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    ctx.fillStyle = "#F9F8F6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
    };
  }, [router]);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", background: "#F9F8F6" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
      />
    </div>
  );
}