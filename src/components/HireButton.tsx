import React, { useState } from 'react';
import { Rocket, Sparkles } from 'lucide-react';

interface HireButtonProps {
  onClick?: () => void;
  className?: string;
}

const HireButton: React.FC<HireButtonProps> = ({ onClick, className = '' }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    
    if (onClick) {
      onClick();
    } else {
      // Default behavior: scroll to contact
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        group relative overflow-hidden
        px-8 py-4 rounded-2xl
        bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500
        text-white font-bold text-lg
        transition-all duration-300
        hover:scale-105 hover:shadow-2xl
        focus:outline-none focus:ring-4 focus:ring-blue-300
        ${isClicked ? 'animate-pulse scale-95' : ''}
        ${className}
      `}
      style={{
        boxShadow: '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(168, 85, 247, 0.3)',
        animation: 'glow-pulse 2s ease-in-out infinite alternate'
      }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-700 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Sparkle effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute w-4 h-4 text-white/60 animate-twinkle"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 2) * 60}%`,
              animationDelay: `${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-3">
        <Rocket className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
        Hire Me
      </span>

      {/* Ripple effect on click */}
      {isClicked && (
        <div className="absolute inset-0 bg-white/20 rounded-2xl animate-ping"></div>
      )}

      {/* Glowing border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
    </button>
  );
};

export default HireButton;