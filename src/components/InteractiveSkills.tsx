import React, { useState, useEffect, useRef } from 'react';
import { 
  Server, 
  Cloud, 
  Code, 
  Database, 
  GitBranch, 
  Terminal,
  Container,
  Cpu,
  Shield,
  Zap
} from 'lucide-react';

const InteractiveSkills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
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
      title: "DevOps & Cloud",
      icon: Server,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "Docker", level: 90, icon: Container, description: "Containerization expert" },
        { name: "AWS", level: 85, icon: Cloud, description: "Cloud infrastructure" },
        { name: "Jenkins", level: 80, icon: Cpu, description: "CI/CD automation" },
        { name: "Kubernetes", level: 75, icon: Shield, description: "Container orchestration" },
        { name: "Linux", level: 90, icon: Terminal, description: "System administration" }
      ]
    },
    {
      title: "Backend Development",
      icon: Code,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "PHP", level: 95, icon: Code, description: "2.7 years experience" },
        { name: "Laravel", level: 90, icon: Zap, description: "Framework mastery" },
        { name: "MySQL", level: 85, icon: Database, description: "Database design" },
        { name: "API Development", level: 88, icon: GitBranch, description: "RESTful services" },
        { name: "Redis", level: 80, icon: Database, description: "Caching solutions" }
      ]
    },
    {
      title: "Tools & Technologies",
      icon: Terminal,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Git", level: 95, icon: GitBranch, description: "Version control" },
        { name: "GitHub Actions", level: 85, icon: Zap, description: "Workflow automation" },
        { name: "Nginx", level: 80, icon: Server, description: "Web server config" },
        { name: "Bash", level: 85, icon: Terminal, description: "Shell scripting" },
        { name: "Postman", level: 90, icon: Code, description: "API testing" }
      ]
    }
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-28 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent mb-4">
              Technical Arsenal
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Cutting-edge technologies and tools that power modern digital infrastructure
            </p>
          </div>

          {/* Category Selector */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-white/10 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl p-2 border border-white/20 dark:border-slate-700/30">
              {skillCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(index)}
                    className={`
                      flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300
                      ${selectedCategory === index 
                        ? 'bg-gradient-to-r ' + category.color + ' text-white shadow-lg scale-105' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-slate-700/50'
                      }
                    `}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-semibold">{category.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories[selectedCategory].skills.map((skill, index) => {
                const SkillIcon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className={`
                      group relative overflow-hidden
                      bg-white/80 dark:bg-slate-800/80 backdrop-blur-md
                      rounded-2xl p-6 border border-white/30 dark:border-slate-700/30
                      hover:scale-105 hover:shadow-2xl
                      transition-all duration-500
                      ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}
                    `}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Animated background */}
                    <div className={`
                      absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300
                      bg-gradient-to-br ${skillCategories[selectedCategory].color}
                    `}></div>

                    {/* Skill content */}
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`
                          p-3 rounded-xl bg-gradient-to-br ${skillCategories[selectedCategory].color}
                          group-hover:scale-110 transition-transform duration-300
                        `}>
                          <SkillIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                            {skill.name}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {skill.description}
                          </p>
                        </div>
                      </div>

                      {/* Skill level */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            Proficiency
                          </span>
                          <span className="text-sm font-bold text-slate-800 dark:text-white">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                          <div
                            className={`
                              h-full rounded-full bg-gradient-to-r ${skillCategories[selectedCategory].color}
                              transition-all duration-1000 ease-out
                              relative overflow-hidden
                            `}
                            style={{ 
                              width: isVisible ? `${skill.level}%` : '0%',
                              transitionDelay: `${index * 100 + 300}ms`
                            }}
                          >
                            {/* Animated shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
                          </div>
                        </div>
                      </div>

                      {/* Hover effect indicator */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span>Active in current projects</span>
                        </div>
                      </div>
                    </div>

                    {/* Floating particles */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-float"
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${20 + i * 20}%`,
                            animationDelay: `${i * 0.5}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tech Stack Summary */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 bg-white/10 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20 dark:border-slate-700/30">
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Total Technologies Mastered:
              </span>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                15+
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveSkills;