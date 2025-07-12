import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Folder, Play, Code, Zap } from 'lucide-react';

const ProjectShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      id: 1,
      title: "DevFlow AI - Multi-Tool Dashboard",
      category: "DevOps",
      description: "The ultimate multi-tool dashboard unifying AI, DevOps, and automation into one sleek, interactive platform.",
      longDescription: "DevFlow AI is a powerful Streamlit-based platform that combines AI capabilities with DevOps automation. Features include remote Docker management over SSH, AI-powered commute estimation using Random Forest ML, AI story co-writing with Gemini API, universal code generation, smart image capture with email/WhatsApp sharing, and a modern glassmorphism dashboard interface.",
      techStack: ["Python", "Streamlit", "Scikit-learn", "Gemini API", "Docker", "Paramiko"],
      image: "🚀",
      color: "from-blue-500 to-cyan-500",
      githubUrl: "https://github.com/sachitkaistha/devflow-ai",
      features: [
        "Remote Docker management over SSH",
        "AI-powered commute estimation",
        "AI story co-writing with text-to-speech",
        "Universal code generation",
        "Smart image capture & sharing"
      ],
      metrics: {
        "Tools Integrated": "6+",
        "AI Models": "Gemini 1.5 Flash",
        "Interface": "Modern Glassmorphism"
      }
    },
    {
      id: 2,
      title: "Remote Docker Manager",
      category: "DevOps",
      description: "Browser-based Docker container management tool with secure SSH connectivity for remote server operations.",
      longDescription: "A comprehensive Docker management solution built with Python and Streamlit. This tool connects securely to remote servers via SSH and provides a web interface for managing Docker operations including container lifecycle management, image operations, DockerHub integration, and remote Docker installation.",
      techStack: ["Python", "Streamlit", "Docker", "SSH", "Subprocess"],
      image: "🐳",
      color: "from-purple-500 to-pink-500",
      githubUrl: "https://github.com/sachitkaistha/remote-docker-manager",
      features: [
        "Secure SSH connectivity",
        "Container lifecycle management",
        "Image pulling and running",
        "DockerHub integration",
        "Remote Docker installation"
      ],
      metrics: {
        "Remote Access": "SSH-based",
        "Operations": "Full Docker CLI",
        "Interface": "Web-based"
      }
    },
    {
      id: 3,
      title: "AI Story Co-Writer",
      category: "AI/ML",
      description: "Interactive storytelling tool using Google Gemini API with mood-based narrative generation and collaborative writing.",
      longDescription: "An AI-powered creative writing assistant that takes user input and continues stories based on selected moods (Mystery, Fantasy, Romance). Built with Gradio for interactive UI and powered by Google Gemini 2.5 Flash via OpenAI-compatible wrapper. Perfect for writers, students, and creative enthusiasts.",
      techStack: ["Python", "Gradio", "Gemini API", "OpenAI SDK"],
      image: "📖",
      color: "from-green-500 to-emerald-500",
      githubUrl: "https://github.com/sachitkaistha/ai-story-cowriter",
      features: [
        "Mood-based story generation",
        "One sentence at a time progression",
        "Interactive Gradio interface",
        "AI-assisted collaborative writing"
      ],
      metrics: {
        "AI Model": "Gemini 2.5 Flash",
        "Moods": "3 (Mystery, Fantasy, Romance)",
        "Interface": "Interactive UI"
      }
    },
    {
      id: 4,
      title: "Gemini-Powered Universal Code Generator",
      category: "AI/ML",
      description: "AI assistant that generates clean, functional code for any programming language using Google Gemini 1.5 Flash.",
      longDescription: "A powerful development tool that merges Generative AI with developer efficiency. Simply describe what you need, and the model delivers accurate, real-time code with context and clarity across multiple programming languages including Python, JavaScript, C++, HTML, C#, and more.",
      techStack: ["Python", "Gemini API", "Gradio", "OpenAI SDK"],
      image: "💻",
      color: "from-orange-500 to-red-500",
      githubUrl: "https://github.com/sachitkaistha/gemini-code-generator",
      features: [
        "Multi-language code generation",
        "Real-time AI assistance",
        "Context-aware responses",
        "Clean, functional output"
      ],
      metrics: {
        "Languages": "10+",
        "AI Model": "Gemini 1.5 Flash",
        "Response Time": "Real-time"
      }
    },
    {
      id: 5,
      title: "Linux Command Menu Tool",
      category: "System Administration",
      description: "Menu-driven Linux utility tool for quick system command execution without memorizing complex syntax.",
      longDescription: "A simple yet effective menu-driven tool built in Python that helps users run common Linux system commands quickly. The tool lists useful commands like date, cal, ping, and more. Users just select a number and the command runs automatically in the terminal, making it especially helpful for beginners exploring Linux.",
      techStack: ["Python", "Linux", "Bash", "Red Hat Enterprise Linux"],
      image: "🐧",
      color: "from-teal-500 to-blue-500",
      githubUrl: "https://github.com/sachitkaistha/linux-command-menu",
      features: [
        "Menu-driven interface",
        "Common system commands",
        "Beginner-friendly design",
        "Automatic command execution"
      ],
      metrics: {
        "Commands": "15+",
        "Platform": "RHEL 9",
        "Environment": "VirtualBox"
      }
    },
    {
      id: 6,
      title: "AI Communication Suite",
      category: "AI/ML",
      description: "Comprehensive communication toolkit with AI-powered SMS, WhatsApp messaging, and voice calling capabilities.",
      longDescription: "A versatile communication platform combining multiple messaging channels with AI integration. Features include Twilio-powered SMS sending, WhatsApp messaging via Twilio Sandbox API, AI-powered voice calling utility, and a unified Gradio interface for seamless user experience across all communication channels.",
      techStack: ["Python", "Twilio API", "Gradio", "WhatsApp API", "Voice API"],
      image: "📱",
      color: "from-yellow-500 to-orange-500",
      githubUrl: "https://github.com/sachitkaistha/ai-communication-suite",
      features: [
        "Multi-channel messaging",
        "AI-powered voice calls",
        "Global SMS delivery",
        "WhatsApp integration",
        "Real-time delivery feedback"
      ],
      metrics: {
        "Channels": "3 (SMS, WhatsApp, Voice)",
        "Global Reach": "E.164 format",
        "API": "Twilio-powered"
      }
    },
    {
      id: 7,
      title: "Photo Capture Web App",
      category: "Web Development",
      description: "Real-time webcam photo capture application with instant gallery and download functionality.",
      longDescription: "A modern web application that accesses webcam in real-time for photo capture with 1280x720 resolution. Features stylish design with smooth animations, instant photo gallery with download options, and responsive design that works smoothly on any screen size.",
      techStack: ["HTML5", "CSS3", "JavaScript", "WebRTC"],
      image: "📸",
      color: "from-pink-500 to-purple-500",
      githubUrl: "https://github.com/sachitkaistha/photo-capture-app",
      features: [
        "Real-time webcam access",
        "High-resolution capture (1280x720)",
        "Instant photo gallery",
        "Download functionality",
        "Responsive design"
      ],
      metrics: {
        "Resolution": "1280x720",
        "Real-time": "WebRTC",
        "Cross-platform": "Any browser"
      }
    }
  ];

  const openModal = (projectIndex: number) => {
    setSelectedProject(projectIndex);
    setShowModal(true);
  };

  return (
    <section id="projects" ref={sectionRef} className="py-28 px-6 relative overflow-hidden">
      <div className="container mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-6xl font-extrabold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Project Showcase
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Innovative solutions that demonstrate expertise in modern development and DevOps practices
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`
                  group relative overflow-hidden
                  bg-white/80 dark:bg-slate-800/80 backdrop-blur-md
                  rounded-3xl border border-white/30 dark:border-slate-700/30
                  hover:scale-105 hover:shadow-2xl
                  transition-all duration-500 cursor-pointer
                  ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}
                `}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => openModal(index)}
              >
                {/* Animated background gradient */}
                <div className={`
                  absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
                  bg-gradient-to-br ${project.color}
                `}></div>

                {/* Project content */}
                <div className="relative z-10 p-8">
                  {/* Project icon/emoji */}
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {project.image}
                  </div>

                  {/* Category badge */}
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color}`}></div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  {/* Project title */}
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors duration-200">
                      <Play className="w-4 h-4" />
                      <span className="text-sm font-medium">Demo</span>
                    </button>
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors duration-200"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                  
                  {/* View details indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-float"
                      style={{
                        left: `${15 + i * 20}%`,
                        top: `${15 + i * 15}%`,
                        animationDelay: `${i * 0.3}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/30 dark:border-slate-700/30 shadow-2xl">
            <div className="p-8">
              {/* Modal header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-4xl mb-2">{projects[selectedProject].image}</div>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                    {projects[selectedProject].title}
                  </h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${projects[selectedProject].color}`}>
                    {projects[selectedProject].category}
                  </span>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  ✕
                </button>
              </div>

              {/* Project details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
                    Project Overview
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {projects[selectedProject].longDescription}
                  </p>

                  <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
                    Key Features
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {projects[selectedProject].features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-green-500" />
                        <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects[selectedProject].techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
                    Project Metrics
                  </h4>
                  <div className="space-y-3 mb-6">
                    {Object.entries(projects[selectedProject].metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                        <span className="text-slate-600 dark:text-slate-300">{key}</span>
                        <span className="font-semibold text-slate-800 dark:text-white">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:scale-105 transition-transform duration-200">
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </button>
                    <a 
                      href={projects[selectedProject].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-slate-800 dark:bg-slate-600 text-white rounded-lg hover:scale-105 transition-transform duration-200"
                    >
                      <Github className="w-5 h-5" />
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectShowcase;