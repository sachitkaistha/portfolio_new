import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import InteractiveSkills from './components/InteractiveSkills';
import Education from './components/Education';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import ProjectShowcase from './components/ProjectShowcase';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TerminalLoader from './components/TerminalLoader';
import { useTheme } from './hooks/useTheme';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Apply theme class to body
    document.body.className = theme === 'dark' ? 'dark' : '';
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-slate-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Terminal Loader */}
      {isLoading && <TerminalLoader onComplete={handleLoadingComplete} />}
      
      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Hero />
        <About />
        <InteractiveSkills />
        <Education />
        <Experience />
        <Certifications />
        <ProjectShowcase />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;