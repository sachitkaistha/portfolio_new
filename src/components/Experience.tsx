import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, Server, Code, Calendar, MapPin } from 'lucide-react';

const Experience: React.FC = () => {
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

  const experiences = [
    {
      title: "DevOps Engineer",
      company: "Current Role",
      period: "Present",
      type: "Full-time",
      location: "Remote",
      status: "current",
      icon: Server,
      description: "Transitioning into DevOps with focus on automation, CI/CD pipelines, and cloud infrastructure.",
      responsibilities: [
        "Designing and implementing CI/CD pipelines using Jenkins and GitHub Actions",
        "Containerizing applications with Docker and orchestrating deployments",
        "Managing cloud infrastructure on AWS with focus on scalability",
        "Automating routine tasks through Bash scripting and configuration management",
        "Monitoring and optimizing system performance and reliability"
      ],
      technologies: ["Docker", "Jenkins", "GitHub Actions", "AWS", "Linux", "Bash", "Nginx"]
    },
    {
      title: "PHP Web Developer",
      company: "Previous Role",
      period: "2.7 Years",
      type: "Full-time",
      location: "On-site",
      status: "completed",
      icon: Code,
      description: "Developed robust web applications using PHP and Laravel framework with strong database management.",
      responsibilities: [
        "Built and maintained dynamic web applications using PHP and Laravel",
        "Designed and optimized MySQL databases for high-performance applications",
        "Developed RESTful APIs and integrated third-party services",
        "Collaborated with cross-functional teams to deliver quality software",
        "Implemented security best practices and code optimization techniques"
      ],
      technologies: ["PHP", "Laravel", "MySQL", "JavaScript", "HTML/CSS", "Git", "Postman"]
    }
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-28 px-6 relative overflow-hidden min-h-[70vh] flex items-center justify-center">
      {/* Animated SVG Accent - Gold/Orange */}
      <svg className="absolute left-0 top-0 w-full h-full -z-10 opacity-40" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="experience-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
        <path fill="url(#experience-gradient)" fillOpacity="0.18" d="M0,64L60,80C120,96,240,128,360,144C480,160,600,160,720,154.7C840,149,960,139,1080,122.7C1200,107,1320,85,1380,74.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
      </svg>
      {/* Floating Briefcase Icon */}
      <Briefcase className="absolute left-1/2 -translate-x-1/2 top-10 w-16 h-16 text-amber-400 opacity-30 animate-float" />
      <div className="container mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-4 mb-10">
            <Briefcase className="w-10 h-10 text-amber-400" />
            <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-amber-400 via-pink-400 to-amber-400 bg-clip-text text-transparent animate-gradient-move">
              Professional Experience
            </h2>
          </div>
          <div className="glass-card p-10 md:p-14 rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/30 backdrop-blur-2xl bg-white/60 dark:bg-slate-800/60 max-w-6xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-pink-400 to-amber-400 opacity-80 rounded-full" />
            <div className="flex flex-col gap-20 relative z-10">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative transition-all duration-1000 delay-${index * 300} flex ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  } ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-amber-400 via-pink-400 to-amber-400 rounded-full border-4 border-white dark:border-slate-900 shadow-lg animate-pulse-slow z-10" />
                  {/* Experience Card */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'ml-12' : 'mr-12'} bg-white/80 dark:bg-slate-800/80 rounded-2xl p-8 hover:bg-white/90 dark:hover:bg-slate-700/80 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/30 dark:border-slate-700/30 shadow-md group relative`}> 
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          exp.status === 'current'
                            ? 'bg-green-100 dark:bg-green-900'
                            : 'bg-amber-100 dark:bg-amber-900'
                        }`}>
                          <exp.icon className={`w-6 h-6 ${
                            exp.status === 'current'
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-amber-600 dark:text-amber-400'
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                            {exp.title}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 font-medium">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        exp.status === 'current'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                      }`}>
                        {exp.status === 'current' ? 'Current' : 'Completed'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mb-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {exp.type}
                      </div>
                    </div>
                    <p className="text-slate-700 dark:text-slate-200 mb-4">
                      {exp.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <h4 className="font-semibold text-slate-800 dark:text-white">
                        Key Responsibilities:
                      </h4>
                      <ul className="space-y-1">
                        {exp.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-2">
                        Technologies Used:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
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

export default Experience;