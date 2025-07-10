import React, { useState, useEffect } from 'react';
import { Moon, Sun, Download, Github, Linkedin, Mail, ExternalLink, ChevronDown } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import InteractiveSkills from './components/InteractiveSkills';
import Education from './components/Education';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import ProjectShowcase from './components/ProjectShowcase';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';
import FloatingChat from './components/FloatingChat';
import TerminalLoader from './components/TerminalLoader';

const themes = [
  { name: 'Blue', class: 'theme-blue' },
  { name: 'Emerald', class: 'theme-emerald' },
  { name: 'Amber', class: 'theme-amber' },
  { name: 'Slate', class: 'theme-slate' },
  { name: 'Dark', class: 'dark' },
];

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    // Show loader for 3 seconds, then show main content
    const timer = setTimeout(() => {
      setShowLoader(false);
      setIsLoaded(true);
    }, 100); // Quick load for demo, change to 3000 for full effect
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.remove(...themes.map(t => t.class));
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setTheme(!darkMode ? 'dark' : 'theme-blue');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (showLoader) {
    return <TerminalLoader onComplete={() => setShowLoader(false)} />;
  }

  return (
    <div className={`${theme} ${darkMode ? 'dark' : ''} transition-colors duration-300`}>
      <div className="dark:bg-slate-900 bg-gray-50 min-h-screen relative overflow-x-hidden">
        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 z-50">
          <div style={{ width: `${scroll}%` }} className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 transition-all duration-200" />
        </div>
        <ThreeBackground />
        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-slate-600" />
          )}
        </button>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/10 dark:bg-slate-900/10 border-b border-white/20 dark:border-slate-700/20">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold text-slate-800 dark:text-white">
                Sachit
              </div>
              <div className="hidden md:flex space-x-8">
                {['about', 'skills', 'education', 'experience', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors capitalize"
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Hero />
          <About />
          <InteractiveSkills />
          <Education />
          <Experience />
          <Certifications />
          <ProjectShowcase />
          <Contact />
        </main>

        {/* Floating Chat */}
        <FloatingChat />

        {/* Enhanced Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;