import React, { useState, useEffect, useRef } from 'react';

interface AnimatedSkillBarProps {
  skill: string;
  percentage: number;
  color?: string;
  delay?: number;
}

const AnimatedSkillBar: React.FC<AnimatedSkillBarProps> = ({
  skill,
  percentage,
  color = 'bg-blue-500',
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const duration = 1500;
        const steps = 60;
        const increment = percentage / steps;
        let current = 0;

        const interval = setInterval(() => {
          current += increment;
          if (current >= percentage) {
            setAnimatedPercentage(percentage);
            clearInterval(interval);
          } else {
            setAnimatedPercentage(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, percentage, delay]);

  return (
    <div ref={barRef} className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {skill}
        </span>
        <span className="text-sm font-bold text-gray-900 dark:text-white">
          {animatedPercentage}%
        </span>
      </div>
      <div className="neu-morphism-inset rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-1000 ease-out relative overflow-hidden rounded-full`}
          style={{ width: `${animatedPercentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedSkillBar;