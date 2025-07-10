import React, { useEffect, useRef } from 'react';

const STAR_COLOR = 'rgba(255,255,255,0.8)';
const STAR_COUNT = 80;
const SHOOTING_STAR_COUNT = 4;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Star field
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.2,
      alpha: randomBetween(0.5, 1),
      twinkle: Math.random() * 0.05 + 0.01
    }));

    // Shooting stars
    let shootingStars: Array<{
      x: number;
      y: number;
      len: number;
      speed: number;
      size: number;
      alpha: number;
      active: boolean;
      trail: number;
    }> = [];

    function spawnShootingStar() {
      shootingStars.push({
        x: randomBetween(width * 0.2, width * 0.8),
        y: randomBetween(0, height * 0.3),
        len: randomBetween(200, 400),
        speed: randomBetween(8, 16),
        size: randomBetween(1, 2.5),
        alpha: 1,
        active: true,
        trail: randomBetween(0.85, 0.95)
      });
    }

    let mouseTrail: Array<{x: number, y: number, alpha: number}> = [];
    function handleMouseMove(e: MouseEvent) {
      mouseTrail.push({ x: e.clientX, y: e.clientY, alpha: 1 });
      if (mouseTrail.length > 30) mouseTrail.shift();
    }
    window.addEventListener('mousemove', handleMouseMove);

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      // Draw stars
      for (const star of stars) {
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = STAR_COLOR;
        ctx.shadowColor = STAR_COLOR;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        // Twinkle
        star.alpha += star.twinkle * (Math.random() > 0.5 ? 1 : -1);
        if (star.alpha < 0.5) star.alpha = 0.5;
        if (star.alpha > 1) star.alpha = 1;
      }
      // Shooting stars
      for (const s of shootingStars) {
        if (!s.active) continue;
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = s.size;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.len * s.trail, s.y + s.len * s.trail);
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 16;
        ctx.stroke();
        ctx.restore();
        s.x += s.speed;
        s.y += s.speed;
        s.alpha -= 0.012;
        if (s.alpha <= 0 || s.x > width + 100 || s.y > height + 100) {
          s.active = false;
        }
      }
      // Remove inactive shooting stars
      shootingStars = shootingStars.filter(s => s.active);
      // Randomly spawn new shooting stars
      if (shootingStars.length < SHOOTING_STAR_COUNT && Math.random() < 0.02) {
        spawnShootingStar();
      }
      // Draw mouse particle trail
      for (let i = 0; i < mouseTrail.length; i++) {
        const t = mouseTrail[i];
        ctx.save();
        ctx.globalAlpha = t.alpha * 0.5;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56,189,248,0.7)';
        ctx.shadowColor = '#a78bfa';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();
        t.alpha *= 0.93;
      }
      mouseTrail = mouseTrail.filter(t => t.alpha > 0.05);
      requestAnimationFrame(animate);
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    }
    window.addEventListener('resize', resize);
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-80 bg-black"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ParticleBackground;