import React, { useState, useEffect } from 'react';
import { Download, Github, Linkedin, Mail, ExternalLink, ChevronDown } from 'lucide-react';
import Hero from './components/Hero';
import EnhancedAbout from './components/EnhancedAbout';
import InteractiveSkills from './components/InteractiveSkills';
import Education from './components/Education';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import ProjectShowcase from './components/ProjectShowcase';
import EnhancedContactForm from './components/EnhancedContactForm';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';
import FloatingChat from './components/FloatingChat';
import TerminalLoader from './components/TerminalLoader';
import ThemeToggle from './components/ThemeToggle';
import './styles/themes.css';


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
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
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


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
    <div className="theme-transition min-h-screen relative overflow-x-hidden" style={{
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 z-50">
          <div style={{ width: `${scroll}%` }} className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 transition-all duration-200" />
        </div>
        <ThreeBackground />
        {/* Theme Toggle */}
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 glass-morphism border-b" style={{
          borderColor: 'var(--border-color)'
        }}>
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                Sachit
              </div>
              <div className="hidden md:flex space-x-8">
                {['about', 'skills', 'education', 'experience', 'projects', 'updates', 'contact'].map((section) => (
                {['about', 'skills', 'education', 'experience', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="transition-colors capitalize hover:scale-105 duration-300"
                    style={{ 
                      color: 'var(--text-secondary)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--accent-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
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
          <EnhancedAbout />
          <InteractiveSkills />
          <Education />
          <Experience />
          <Certifications />
          <ProjectShowcase />
          <EnhancedContactForm />
        </main>

        {/* Floating Chat */}
        <FloatingChat />

        {/* Enhanced Footer */}
        <Footer />
    </div>
  );
}

export default App;