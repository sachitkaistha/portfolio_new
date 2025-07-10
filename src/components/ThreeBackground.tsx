import React, { useRef, useEffect } from 'react';

const ThreeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Particle system for 3D-like effect
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    // Tech logos floating
    const techLogos = ['⚛️', '🐳', '☁️', '⚙️', '🔧', '💻', '🚀', '⭐'];
    const floatingLogos: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      emoji: string;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: ['#38bdf8', '#a78bfa', '#f472b6', '#34d399'][Math.floor(Math.random() * 4)],
        alpha: Math.random() * 0.8 + 0.2
      });
    }

    // Initialize floating tech logos
    for (let i = 0; i < 8; i++) {
      floatingLogos.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 500 + 100,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 1,
        emoji: techLogos[i],
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Create grid effect
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Animate particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Wrap around screen
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
        if (particle.z < 0) particle.z = 1000;
        if (particle.z > 1000) particle.z = 0;

        // 3D projection
        const scale = 200 / (200 + particle.z);
        const x2d = particle.x * scale + (width / 2) * (1 - scale);
        const y2d = particle.y * scale + (height / 2) * (1 - scale);

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.alpha * scale;
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 10 * scale;
        ctx.beginPath();
        ctx.arc(x2d, y2d, particle.size * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Animate floating tech logos
      floatingLogos.forEach(logo => {
        logo.x += logo.vx;
        logo.y += logo.vy;
        logo.z += logo.vz;
        logo.rotation += logo.rotationSpeed;

        // Wrap around
        if (logo.x < -50) logo.x = width + 50;
        if (logo.x > width + 50) logo.x = -50;
        if (logo.y < -50) logo.y = height + 50;
        if (logo.y > height + 50) logo.y = -50;
        if (logo.z < 50) logo.z = 500;
        if (logo.z > 500) logo.z = 50;

        // 3D projection
        const scale = 100 / (100 + logo.z);
        const x2d = logo.x * scale + (width / 2) * (1 - scale);
        const y2d = logo.y * scale + (height / 2) * (1 - scale);

        // Draw emoji with rotation
        ctx.save();
        ctx.globalAlpha = 0.7 * scale;
        ctx.translate(x2d, y2d);
        ctx.rotate(logo.rotation);
        ctx.font = `${30 * scale}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(logo.emoji, 0, 0);
        ctx.restore();
      });

      // Connect nearby particles with lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.save();
            ctx.globalAlpha = (100 - distance) / 100 * 0.2;
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 opacity-60"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ThreeBackground;