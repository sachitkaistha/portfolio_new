import React, { useEffect, useRef, useState } from 'react';
import { Cpu, Terminal, Cloud, Code2 } from 'lucide-react';

const Skills: React.FC = () => {
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

  const skillCategories = [
    {
      title: "DevOps Tools",
      skills: [
        { name: "Docker", level: 85, color: "bg-blue-500" },
        { name: "Jenkins", level: 80, color: "bg-red-500" },
        { name: "GitHub Actions", level: 90, color: "bg-gray-800" },
        { name: "CI/CD Pipelines", level: 85, color: "bg-green-500" },
        { name: "Bash Scripting", level: 80, color: "bg-yellow-500" }
      ]
    },
    {
      title: "Cloud & Infrastructure",
      skills: [
        { name: "AWS", level: 75, color: "bg-orange-500" },
        { name: "Linux", level: 85, color: "bg-black" },
        { name: "Nginx", level: 80, color: "bg-green-600" }
      ]
    },
    {
      title: "Web Development",
      skills: [
        { name: "PHP", level: 90, color: "bg-purple-600" },
        { name: "Laravel", level: 85, color: "bg-red-600" },
        { name: "MySQL", level: 80, color: "bg-blue-600" }
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", level: 90, color: "bg-orange-600" },
        { name: "GitHub", level: 85, color: "bg-gray-700" },
        { name: "Postman", level: 80, color: "bg-orange-500" }
      ]
    }
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-24 px-6 relative overflow-hidden min-h-[70vh] flex items-center justify-center">
      {/* Animated SVG Accent - Blue/Emerald */}
      <svg className="absolute left-0 top-0 w-full h-full -z-10 opacity-40" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skills-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <path fill="url(#skills-gradient)" fillOpacity="0.18" d="M0,96L60,112C120,128,240,160,360,176C480,192,600,192,720,186.7C840,181,960,171,1080,154.7C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
      </svg>
      {/* Floating Tech Icons */}
      <Cpu className="absolute left-10 top-10 w-16 h-16 text-blue-400 opacity-30 animate-float" />
      <Terminal className="absolute right-20 top-24 w-14 h-14 text-emerald-400 opacity-30 animate-float-delayed" />
      <Cloud className="absolute left-24 bottom-16 w-14 h-14 text-blue-300 opacity-30 animate-float-slow" />
      <Code2 className="absolute right-10 bottom-10 w-16 h-16 text-emerald-300 opacity-30 animate-float" />
      <div className="container mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Cpu className="w-10 h-10 text-blue-400" />
            <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent animate-gradient-move">
              Technical Skills
            </h2>
          </div>
          {/* Horizontal Scrollable Carousel for Skill Categories */}
          <div className="glass-card p-8 md:p-10 rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/30 backdrop-blur-2xl bg-white/60 dark:bg-slate-800/60 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent">
            <div className="flex gap-8 min-w-[700px]">
              {skillCategories.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className={`transition-all duration-1000 delay-${categoryIndex * 200} w-64 inline-block align-top ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                  <div className="bg-white/40 dark:bg-slate-800/60 rounded-2xl p-6 hover:bg-white/60 dark:hover:bg-slate-700/70 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/30 dark:border-slate-700/30 shadow-md">
                    <h3 className="text-xl font-semibold mb-6 text-slate-800 dark:text-white text-center">
                      {category.title}
                    </h3>
                    <div className="space-y-5">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="group">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                              {skill.name}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out group-hover:scale-110 animate-pulse-slow`}
                              style={{
                                width: isVisible ? `${skill.level}%` : '0%',
                                transitionDelay: `${(categoryIndex * 200) + (skillIndex * 100)}ms`
                              }}
                            ></div>
                          </div>
                        </div>
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

export default Skills;