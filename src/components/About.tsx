import React, { useEffect, useRef, useState } from 'react';
import { Code, Server, Cloud, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-6 relative overflow-hidden min-h-[80vh] flex items-center justify-center">
      {/* Animated SVG Background Accent */}
      <svg className="absolute left-0 top-0 w-full h-full -z-10 opacity-40" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="about-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
        <path fill="url(#about-gradient)" fillOpacity="0.18" d="M0,160L60,170C120,180,240,200,360,192C480,184,600,144,720,133.3C840,123,960,149,1080,154.7C1200,160,1320,144,1380,136L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
      </svg>
      {/* Glassmorphism Card with Timeline Accent */}
      <div className="relative max-w-5xl w-full mx-auto flex flex-col md:flex-row items-stretch shadow-2xl rounded-3xl overflow-hidden glass-card border border-white/30 dark:border-slate-700/30 backdrop-blur-2xl bg-white/60 dark:bg-slate-800/60">
        {/* Timeline/Accent Bar */}
        <div className="hidden md:block w-2 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-400 opacity-70" />
        {/* Main Content */}
        <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
          <h2 className="text-5xl font-extrabold mb-8 text-slate-800 dark:text-white bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-gradient-move">
            About Me
          </h2>
          <blockquote className="text-2xl md:text-3xl font-semibold italic text-blue-500 dark:text-blue-300 mb-8 max-w-2xl">
            "Empowering teams to build, automate, and innovate."
          </blockquote>
          <div className="space-y-8">
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}> 
              <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                My journey in tech began with a passion for <span className="text-blue-500 dark:text-blue-400 font-semibold">PHP development</span>,
                where I spent 2.7 years building robust web applications and mastering the art of clean, efficient code.
              </p>
            </div>
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}> 
              <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                The evolution into <span className="text-purple-500 dark:text-purple-400 font-semibold">DevOps</span> felt natural –
                combining my development experience with infrastructure automation, CI/CD pipelines, and cloud technologies.
              </p>
            </div>
            <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}> 
              <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                I'm a <span className="text-green-500 dark:text-green-400 font-semibold">problem-solver</span> at heart,
                passionate about creating scalable infrastructure solutions that empower development teams to ship faster and more reliably.
              </p>
            </div>
          </div>
        </div>
        {/* Icon Cards Column */}
        <div className="flex flex-col justify-center gap-6 p-8 bg-gradient-to-b from-white/40 via-blue-50/30 to-purple-50/20 dark:from-slate-800/40 dark:via-slate-900/30 dark:to-slate-900/10 min-w-[220px]">
          {[
            { icon: Code, title: "Development", desc: "2.7 years PHP experience" },
            { icon: Server, title: "DevOps", desc: "Infrastructure automation" },
            { icon: Cloud, title: "Cloud", desc: "AWS & modern platforms" },
            { icon: Lightbulb, title: "Innovation", desc: "Continuous learning" }
          ].map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 delay-${300 + index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="p-5 bg-white/70 dark:bg-slate-800/70 rounded-2xl hover:bg-white/90 dark:hover:bg-slate-700/80 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/30 dark:border-slate-700/30 shadow-md flex flex-col items-center">
                <item.icon className="w-10 h-10 text-blue-500 dark:text-blue-400 mb-2" />
                <h3 className="font-semibold text-slate-800 dark:text-white mb-1 text-center">{item.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 text-center">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;