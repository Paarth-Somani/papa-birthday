'use client';
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const Confetti = forwardRef(function Confetti(_, ref) {
  const canvasRef = useRef(null);
  const piecesRef = useRef([]);
  const colors = ['#19f0ff', '#7af6ff', '#ff2bd0', '#a35cff', '#b6ff36', '#ffffff'];

  useImperativeHandle(ref, () => ({
    burst(x, y, count = 150) {
      const c = canvasRef.current;
      if (!c) return;
      const px = x ?? c.width / 2;
      const py = y ?? c.height * 0.5;
      for (let i = 0; i < count; i++) {
        piecesRef.current.push({
          x: px, y: py,
          vx: (Math.random() - 0.5) * 14,
          vy: Math.random() * -15 - 4,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          rot: Math.random() * 360,
          vr: (Math.random() - 0.5) * 14,
          g: 0.34,
          life: 1,
        });
      }
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;
    function resize() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      piecesRef.current.forEach((p) => {
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= 0.006;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      ctx.shadowBlur = 0;
      piecesRef.current = piecesRef.current.filter((p) => p.life > 0 && p.y < canvas.height + 60);
      raf = requestAnimationFrame(frame);
    }
    frame();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas id="confetti" ref={canvasRef} />;
});

export default Confetti;
