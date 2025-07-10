import React, { useEffect, useRef, useState } from 'react';
import { Code, Cpu, Terminal, Zap } from 'lucide-react';

const AnimatedAvatar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(0);
  const avatarRef = useRef<HTMLDivElement>(null);

  const techIcons = [Code, Cpu, Terminal, Zap];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % techIcons.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!avatarRef.current) return;
      
      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / 20;
      const deltaY = (e.clientY - centerY) / 20;
      
      avatarRef.current.style.transform = `
        perspective(1000px) 
        rotateY(${deltaX}deg) 
        rotateX(${-deltaY}deg) 
        scale(${isHovered ? 1.1 : 1})
      `;
    };

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      if (avatarRef.current) {
        avatarRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
      }
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  const CurrentIcon = techIcons[currentIcon];

  return (
    <div className="relative flex items-center justify-center">
      {/* Orbital rings */}
      <div className="absolute inset-0 animate-spin-slow">
        <div className="w-80 h-80 border border-blue-400/30 rounded-full"></div>
      </div>
      <div className="absolute inset-4 animate-spin-reverse">
        <div className="w-72 h-72 border border-purple-400/30 rounded-full border-dashed"></div>
      </div>
      <div className="absolute inset-8 animate-spin-slow">
        <div className="w-64 h-64 border border-pink-400/30 rounded-full"></div>
      </div>

      {/* Floating particles around avatar */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full animate-float"
          style={{
            left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
            top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${3 + i * 0.5}s`
          }}
        />
      ))}

      {/* Main avatar container */}
      <div
        ref={avatarRef}
        className="relative w-64 h-64 transition-all duration-300 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Holographic effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse-slow"></div>
        
        {/* Avatar base */}
        <div className="relative w-full h-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 rounded-full border-4 border-blue-400/50 shadow-2xl overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-gradient-move"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.3),transparent_50%)] animate-pulse"></div>
          </div>

          {/* Tech icon in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <CurrentIcon 
                className="w-20 h-20 text-blue-400 transition-all duration-500 animate-bounce-slow" 
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(56, 189, 248, 0.8))',
                  transform: isHovered ? 'scale(1.2) rotate(10deg)' : 'scale(1) rotate(0deg)'
                }}
              />
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>

          {/* Scanning lines effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan"></div>
          </div>

          {/* Corner indicators */}
          <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-blue-400 animate-pulse"></div>
          <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-blue-400 animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-blue-400 animate-pulse"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-blue-400 animate-pulse"></div>
        </div>

        {/* Status indicator */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-2 bg-slate-800/90 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-400/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-blue-400 font-mono">ONLINE</span>
          </div>
        </div>
      </div>

      {/* Floating tech badges */}
      {['DevOps', 'Backend', 'Cloud', 'CI/CD'].map((tech, i) => (
        <div
          key={tech}
          className="absolute text-xs font-mono text-blue-400 bg-slate-800/80 backdrop-blur-sm rounded-full px-3 py-1 border border-blue-400/30 animate-float"
          style={{
            left: `${20 + i * 15}%`,
            top: `${20 + (i % 2) * 60}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${4 + i * 0.3}s`
          }}
        >
          {tech}
        </div>
      ))}
    </div>
  );
};

export default AnimatedAvatar;