import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Calendar } from 'lucide-react';

const Education: React.FC = () => {
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

  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      period: "June 2023 - June 2025",
      status: "Pursuing",
      description: "Advanced studies in computer science, software engineering, and emerging technologies.",
      highlights: ["Advanced Programming", "System Design", "Cloud Computing", "DevOps Practices"]
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      period: "June 2019 - June 2022",
      status: "Completed",
      description: "Comprehensive foundation in computer science fundamentals and programming.",
      highlights: ["Programming Fundamentals", "Database Management", "Web Development", "Software Engineering"]
    },
    {
      degree: "PHP Development Training",
      period: "6 Months Intensive",
      status: "Completed",
      description: "Hands-on training in PHP web development with real-world projects.",
      highlights: ["PHP Fundamentals", "Laravel Framework", "MySQL Database", "Project Development"]
    }
  ];

  return (
    <section id="education" ref={sectionRef} className="py-28 px-6 relative overflow-hidden min-h-[70vh] flex items-center justify-center">
      {/* Animated SVG Accent - Purple/Pink */}
      <svg className="absolute left-0 top-0 w-full h-full -z-10 opacity-40" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="education-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
        <path fill="url(#education-gradient)" fillOpacity="0.18" d="M0,224L60,208C120,192,240,160,360,154.7C480,149,600,171,720,176C840,181,960,171,1080,154.7C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
      </svg>
      {/* Floating Graduation Cap Icon */}
      <GraduationCap className="absolute left-1/2 -translate-x-1/2 top-10 w-16 h-16 text-purple-400 opacity-30 animate-float" />
      <div className="container mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-4 mb-10">
            <GraduationCap className="w-10 h-10 text-purple-400" />
            <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-move">
              Education
            </h2>
          </div>
          <div className="glass-card p-10 md:p-14 rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/30 backdrop-blur-2xl bg-white/60 dark:bg-slate-800/60 max-w-4xl mx-auto">
            <div className="relative flex flex-col items-center">
              {/* Timeline Line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-purple-400 via-pink-400 to-purple-500 opacity-80 rounded-full" />
              <div className="space-y-20 w-full">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className={`relative transition-all duration-1000 delay-${index * 200} flex ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg animate-pulse-slow z-10" />
                    {/* Content Card */}
                    <div className="flex-1 ml-16 bg-white/80 dark:bg-slate-800/80 rounded-2xl p-8 hover:bg-white/90 dark:hover:bg-slate-700/80 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/30 dark:border-slate-700/30 shadow-md group relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <GraduationCap className="w-6 h-6 text-purple-400" />
                          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                            {edu.degree}
                          </h3>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          edu.status === 'Pursuing'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        }`}>
                          {edu.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-200 mb-4">
                        {edu.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {edu.highlights.map((highlight, highlightIndex) => (
                          <span
                            key={highlightIndex}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-xs font-medium"
                          >
                            {highlight}
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
      </div>
    </section>
  );
};

export default Education;