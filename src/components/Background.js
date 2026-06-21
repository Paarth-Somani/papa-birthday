'use client';
import { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    let sparks = [];

    const colors = ['#ffc24b', '#ff9e2c', '#ff5d73', '#f5c451'];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    function init() {
      const count = Math.min(40, Math.floor(window.innerWidth / 36));
      sparks = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        sp: Math.random() * 0.3 + 0.08,
        dx: Math.random() * 0.4 - 0.2,
        a: Math.random() * 0.5 + 0.2,
        c: colors[Math.floor(Math.random() * colors.length)],
        tw: Math.random() * Math.PI * 2,
      }));
    }
    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks.forEach((s) => {
        s.y -= s.sp;
        s.x += s.dx;
        s.tw += 0.04;
        if (s.y < -10) { s.y = canvas.height + 10; s.x = Math.random() * canvas.width; }
        const flicker = (Math.sin(s.tw) + 1) / 2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.c;
        ctx.globalAlpha = s.a * (0.4 + 0.6 * flicker);
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.c;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(frame);
    }
    resize(); init(); frame();
    window.addEventListener('resize', () => { resize(); init(); });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div className="aurora"><div className="aurora-blob" /></div>
      <div className="grain" />
      <canvas id="sparks" ref={canvasRef} />
    </>
  );
}
