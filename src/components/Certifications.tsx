import React, { useEffect, useRef, useState } from 'react';
import { Award, Calendar } from 'lucide-react';

const Certifications: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const certifications = [
    {
      title: "PHP for Beginners",
      issuer: "Udemy",
      year: "2022",
      description: "Comprehensive course covering PHP fundamentals and web development basics.",
      color: "from-purple-500 to-pink-500",
      skills: ["PHP Basics", "Web Development", "Database Integration", "Project Development"]
    },
    {
      title: "Linux World Informatics Internship",
      issuer: "Linux World Informatics",
      year: "2025",
      description: "Pursuing comprehensive internship under Vimal Daga Sir, focusing on AI integration and DevOps automation.",
      color: "from-blue-500 to-cyan-500",
      skills: ["AI Integration", "DevOps Automation", "Python Development", "Cloud Technologies"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certifications.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [certifications.length]);

  return (
    <section id="certifications" ref={sectionRef} className="py-28 px-6 relative overflow-hidden min-h-[60vh] flex items-center justify-center">
      {/* Animated SVG Accent - Teal/Blue */}
      <svg className="absolute left-0 top-0 w-full h-full -z-10 opacity-40" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="certs-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <path fill="url(#certs-gradient)" fillOpacity="0.18" d="M0,160L60,170C120,180,240,200,360,192C480,184,600,144,720,133.3C840,123,960,149,1080,154.7C1200,160,1320,144,1380,136L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
      </svg>
      {/* Floating Award Icon */}
      <Award className="absolute left-1/2 -translate-x-1/2 top-10 w-16 h-16 text-cyan-400 opacity-30 animate-float" />
      <div className="container mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-4 mb-10">
            <Award className="w-10 h-10 text-cyan-400" />
            <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-move">
              Certifications & Training
            </h2>
          </div>
          <div className="glass-card p-10 md:p-14 rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/30 backdrop-blur-2xl bg-white/60 dark:bg-slate-800/60 max-w-3xl mx-auto relative">
            {/* Vertical Stepper Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-blue-400 to-cyan-400 opacity-80 rounded-full" />
            <div className="flex flex-col gap-16 relative z-10">
              {certifications.map((cert, index) => (
                <div key={index} className={`relative flex transition-all duration-1000 delay-${index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  {/* Step Dot */}
                  <div className="absolute left-4 w-8 h-8 bg-gradient-to-br from-cyan-400 via-blue-400 to-cyan-400 rounded-full border-4 border-white dark:border-slate-900 shadow-lg animate-pulse-slow z-10" />
                  {/* Certification Card */}
                  <div className="ml-20 bg-white/80 dark:bg-slate-800/80 rounded-2xl p-8 hover:bg-white/90 dark:hover:bg-slate-700/80 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/30 dark:border-slate-700/30 shadow-md group relative">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="w-8 h-8 text-cyan-400" />
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
                        {cert.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg font-semibold text-slate-600 dark:text-slate-300">
                        {cert.issuer}
                      </span>
                      <span className="text-slate-400">•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span className="text-slate-500">{cert.year}</span>
                      </div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-200 mb-4">
                      {cert.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;