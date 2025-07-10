import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';

const Projects: React.FC = () => {
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

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-featured e-commerce solution built with Laravel, featuring user authentication, product catalog, shopping cart, and payment integration.",
      techStack: ["PHP", "Laravel", "MySQL", "JavaScript", "Bootstrap"],
      category: "Web Development",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "CI/CD Pipeline Automation",
      description: "Automated deployment pipeline using Jenkins and Docker, reducing deployment time by 80% and ensuring consistent environment setups.",
      techStack: ["Jenkins", "Docker", "GitHub Actions", "AWS", "Bash"],
      category: "DevOps",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Inventory Management System",
      description: "Comprehensive inventory tracking system with real-time updates, reporting dashboard, and multi-user access control.",
      techStack: ["PHP", "Laravel", "MySQL", "Chart.js", "AJAX"],
      category: "Web Development",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Infrastructure as Code",
      description: "Automated infrastructure provisioning using Terraform and AWS services, ensuring scalable and reproducible deployments.",
      techStack: ["Terraform", "AWS", "EC2", "RDS", "S3"],
      category: "DevOps",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "API Gateway Service",
      description: "Microservices architecture with API gateway, load balancing, and service discovery for improved scalability and reliability.",
      techStack: ["PHP", "Laravel", "Redis", "Nginx", "Docker"],
      category: "Backend",
      color: "from-teal-500 to-blue-500"
    },
    {
      title: "Monitoring Dashboard",
      description: "Real-time monitoring and alerting system for infrastructure and application metrics with custom dashboards.",
      techStack: ["Grafana", "Prometheus", "Docker", "Linux", "Bash"],
      category: "DevOps",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-28 px-6 relative overflow-hidden min-h-[60vh] flex items-center justify-center">
      {/* Animated SVG Accent - Green/Blue */}
      <svg className="absolute left-0 top-0 w-full h-full -z-10 opacity-40" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="projects-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <path fill="url(#projects-gradient)" fillOpacity="0.18" d="M0,64L60,80C120,96,240,128,360,144C480,160,600,160,720,154.7C840,149,960,139,1080,122.7C1200,107,1320,85,1380,74.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
      </svg>
      {/* Floating Folder Icon */}
      <Folder className="absolute left-1/2 -translate-x-1/2 top-10 w-16 h-16 text-green-400 opacity-30 animate-float" />
      <div className="container mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-4 mb-10">
            <Folder className="w-10 h-10 text-green-400" />
            <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent animate-gradient-move">
              Featured Projects
            </h2>
          </div>
          <div className="glass-card p-10 md:p-14 rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/30 backdrop-blur-2xl bg-white/60 dark:bg-slate-800/60 max-w-7xl mx-auto">
            {/* Masonry Grid Layout */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]"><div className="flex flex-col gap-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 delay-${index * 100} break-inside-avoid rounded-2xl ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="h-full bg-white/80 dark:bg-slate-800/80 rounded-2xl p-8 hover:bg-white/90 dark:hover:bg-slate-700/80 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/30 dark:border-slate-700/30 shadow-md group flex flex-col">
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${project.color} bg-opacity-20`}>
                        <Folder className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg bg-white/10 dark:bg-slate-700/50 hover:bg-white/20 dark:hover:bg-slate-600/50 transition-all duration-300 hover:scale-110">
                          <Github className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                        </button>
                        <button className="p-2 rounded-lg bg-white/10 dark:bg-slate-700/50 hover:bg-white/20 dark:hover:bg-slate-600/50 transition-all duration-300 hover:scale-110">
                          <ExternalLink className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                        </button>
                      </div>
                    </div>
                    {/* Project Info */}
                    <div className="mb-4">
                      <span className="text-xs font-medium text-green-500 dark:text-green-400 uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mt-1 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;