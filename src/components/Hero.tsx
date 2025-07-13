import React, { useState, useEffect, useRef } from 'react';
import { Download, Github, Linkedin, Mail, ChevronDown, Mail as MailIcon } from 'lucide-react';
import AnimatedAvatar from './AnimatedAvatar';
import HireButton from './HireButton';

const taglines = [
  'Building bridges between code and cloud.',
  'Automating the future, one script at a time.',
  'Turning ideas into scalable solutions.',
  'Cloud-native, code-driven.'
];

const floatingQuotes = [
  "Code is like humor. When you have to explain it, it's bad.",
  "Simplicity is the soul of efficiency.",
  "First, solve the problem. Then, write the code.",
  "Experience is the name everyone gives to their mistakes.",
  "In order to be irreplaceable, one must always be different.",
  "Java is to JavaScript what car is to Carpet.",
  "Knowledge is power."
];

const Hero: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [taglineText, setTaglineText] = useState('');
  const [isTaglineDeleting, setIsTaglineDeleting] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  // Confetti animation for resume button
  const [showConfetti, setShowConfetti] = useState(false);

  const texts = [
    "Hi, I'm Sachit.",
    "DevOps Engineer",
    "Ex-PHP Developer", 
    "Tech Enthusiast"
  ];

  // Main animated text
  useEffect(() => {
    setShowContent(true);
    const timeout = setTimeout(() => {
      const currentText = texts[currentIndex];
      if (!isDeleting && displayText !== currentText) {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      } else if (isDeleting && displayText !== '') {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      } else if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting]);

  // Dynamic tagline typewriter
  useEffect(() => {
    const tagline = taglines[taglineIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isTaglineDeleting && taglineText !== tagline) {
      timeout = setTimeout(() => setTaglineText(tagline.substring(0, taglineText.length + 1)), 60);
    } else if (isTaglineDeleting && taglineText !== '') {
      timeout = setTimeout(() => setTaglineText(tagline.substring(0, taglineText.length - 1)), 30);
    } else if (!isTaglineDeleting && taglineText === tagline) {
      timeout = setTimeout(() => setIsTaglineDeleting(true), 1800);
    } else if (isTaglineDeleting && taglineText === '') {
      setIsTaglineDeleting(false);
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }
    return () => clearTimeout(timeout);
  }, [taglineText, taglineIndex, isTaglineDeleting]);

  // 3D/parallax hover effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!profileRef.current) return;
      const rect = profileRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      profileRef.current.style.transform = `rotateY(${x / 30}deg) rotateX(${-y / 30}deg) scale(1.04)`;
    };
    const handleMouseLeave = () => {
      if (profileRef.current) profileRef.current.style.transform = '';
    };
    const node = profileRef.current;
    if (node) {
      node.addEventListener('mousemove', handleMouseMove);
      node.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (node) {
        node.removeEventListener('mousemove', handleMouseMove);
        node.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Confetti animation for resume button
  const handleResumeClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1200);
    // Add your download logic here
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* Confetti burst for resume button */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="confetti-burst" />
        </div>
      )}
      {/* Floating Quotes */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {floatingQuotes.map((quote, i) => (
          <span
            key={i}
            className={`floating-quote quote-${i}`}
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i * 10)}%`,
              animationDelay: `${i * 2}s`
            }}
          >
            {quote}
          </span>
        ))}
      </div>
      {/* Sparkle/Confetti Animation */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="sparkle-confetti" />
      </div>
      {/* Glassmorphism Card with Animated Border */}
      <div className={`container mx-auto transition-opacity duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} `}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 relative z-20">
            <div className="h-24">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-gradient-move">
                {displayText}
                <span className="animate-pulse">|</span>
              </h1>
            </div>
            <div className="p-1 rounded-2xl animated-border-glass bg-white/30 dark:bg-slate-800/30 shadow-xl backdrop-blur-md border border-white/30 dark:border-slate-700/30">
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg px-6 py-4">
                Building scalable systems & automating the future. Passionate DevOps Engineer with a strong background in PHP development.
              </p>
            </div>
            <p className="italic text-blue-500 dark:text-blue-300 text-base min-h-[2.5rem]">
              {taglineText}
              <span className="animate-pulse">|</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <HireButton />
              <button onClick={handleResumeClick} className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                <span className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Resume
                </span>
                <div className="absolute inset-0 bg-white/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </button>
              <div className="flex gap-4">
                <a href="https://github.com/sachitkaistha" target="_blank" rel="noopener noreferrer" className="p-3 bg-gradient-to-br from-white/30 to-blue-100 dark:from-slate-800/50 dark:to-blue-900 rounded-lg hover:bg-white/40 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110 shadow-md relative group animated-social" title="GitHub">
                  <Github className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-xs rounded px-2 py-1 pointer-events-none transition-all">GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/sachit-kaistha-306849190" target="_blank" rel="noopener noreferrer" className="p-3 bg-gradient-to-br from-white/30 to-blue-100 dark:from-slate-800/50 dark:to-blue-900 rounded-lg hover:bg-white/40 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110 shadow-md relative group animated-social" title="LinkedIn">
                  <Linkedin className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-xs rounded px-2 py-1 pointer-events-none transition-all">LinkedIn</span>
                </a>
                <a href="mailto:skaistha16@gmail.com" className="p-3 bg-gradient-to-br from-white/30 to-blue-100 dark:from-slate-800/50 dark:to-blue-900 rounded-lg hover:bg-white/40 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-110 shadow-md relative group animated-social" title="Email">
                  <Mail className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-xs rounded px-2 py-1 pointer-events-none transition-all">Email</span>
                </a>
              </div>
            </div>
          </div>
          {/* Animated Avatar */}
          <div className="flex justify-center relative z-10">
            <AnimatedAvatar />
          </div>
        </div>
      </div>
      {/* Call to Action Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <ChevronDown className="w-8 h-8 text-blue-500 dark:text-blue-400 drop-shadow-lg" />
      </div>
      {/* SVG Wavy Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-30 pointer-events-none">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24">
          <path fill="url(#wave-gradient)" fillOpacity="0.7" d="M0,80 C360,160 1080,0 1440,80 L1440,120 L0,120 Z" />
          <defs>
            <linearGradient id="wave-gradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {/* Personal Monogram Logo Watermark */}
      <div className="fixed bottom-4 right-4 z-40 pointer-events-none select-none opacity-30">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="32" fill="#a78bfa" />
          <text x="50%" y="54%" textAnchor="middle" fill="#fff" fontSize="2.5rem" fontWeight="bold" fontFamily="sans-serif" dy=".3em">S</text>
        </svg>
      </div>
      {/* Floating Contact Button */}
      <button
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl hover:scale-110 transition-all duration-300 flex items-center gap-2 contact-fab"
        aria-label="Contact"
      >
        <MailIcon className="w-6 h-6" />
        <span className="hidden md:inline">Contact</span>
      </button>
    </section>
  );
};

export default Hero;
// Add the following to your global CSS (index.css):
// .animate-gradient-move { background-size: 200% 200%; animation: gradientMove 4s linear infinite; }
// @keyframes gradientMove { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
// .animate-float { animation: float 6s ease-in-out infinite alternate; }
// .animate-float-delayed { animation: float 8s 2s ease-in-out infinite alternate; }
// .animate-float-slow { animation: float 10s 1s ease-in-out infinite alternate; }
// @keyframes float { 0% { transform: translateY(0); } 100% { transform: translateY(-20px); } }

// @keyframes float { 0% { transform: translateY(0); } 100% { transform: translateY(-20px); } }

