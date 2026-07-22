"use client";

import { useEffect, useRef } from "react";

export default function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const cols = 90;
    const rows = 40;
    const spacingX = width / cols;
    const spacingY = height / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * spacingX + (row % 2 === 0 ? spacingX / 2 : 0);

        const normX = col / cols;
        const normY = row / rows;

        const wave =
          Math.sin(normX * Math.PI * 3 + normY * 2) * 18 +
          Math.sin(normX * Math.PI * 6) * 8;

        const baseY = normY * height;
        const y = baseY + wave * (1 - normY * 0.6);

        const noise = (Math.random() - 0.5) * 6;

        const distFromCenter = Math.abs(normY - 0.35);
        const brightness = Math.max(0, 1 - distFromCenter * 1.8);

        const opacity = Math.min(1, brightness * 1.1) * (0.15 + Math.random() * 0.5);
        const size = 0.6 + brightness * 1.4 + Math.random() * 0.5;

        if (opacity < 0.04) continue;

        ctx.beginPath();
        ctx.arc(x + noise, y + noise, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 45, 85, ${opacity.toFixed(2)})`;
        ctx.fill();
      }
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full h-[280px] pointer-events-none"
    />
  );
}
