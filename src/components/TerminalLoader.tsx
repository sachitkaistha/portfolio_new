import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

interface TerminalLoaderProps {
  onComplete: () => void;
}

const TerminalLoader: React.FC<TerminalLoaderProps> = ({ onComplete }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const lines = [
    '> Initializing Sachit Portfolio System...',
    '> Loading modules... ✓',
    '> Optimizing performance... ✓',
    '> System ready! Welcome to the future.'
  ];

  useEffect(() => {
    if (currentLine >= lines.length) {
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(onComplete, 200);
      }, 400);
      return;
    }

    const line = lines[currentLine];
    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setCurrentChar(currentChar + 1);
      }, 15);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLine(currentLine + 1);
        setCurrentChar(0);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, lines, onComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-slate-900 flex items-center justify-center transition-opacity duration-500 ${isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="max-w-2xl w-full mx-4">
        <div className="bg-slate-800 rounded-lg border border-slate-700 shadow-2xl overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 bg-slate-700 px-4 py-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Terminal className="w-4 h-4 text-slate-300" />
              <span className="text-slate-300 text-sm font-mono">sachit@portfolio:~$</span>
            </div>
          </div>

          {/* Terminal content */}
          <div className="p-6 font-mono text-green-400 bg-slate-900 min-h-[300px]">
            {lines.slice(0, currentLine).map((line, index) => (
              <div key={index} className="mb-2 animate-fade-in">
                {line}
              </div>
            ))}
            {currentLine < lines.length && (
              <div className="mb-2">
                {lines[currentLine].slice(0, currentChar)}
                <span className="animate-pulse bg-green-400 text-slate-900 ml-1">█</span>
              </div>
            )}
            
            {/* Progress bar */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-400">Loading:</span>
                <div className="flex-1 bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentLine / lines.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-slate-400 text-sm">
                  {Math.round((currentLine / lines.length) * 100)}%
                </span>
              </div>
            </div>

            {/* ASCII Art */}
            <div className="mt-6 text-blue-400 text-xs leading-tight opacity-60">
              <pre>{`
    ███████╗ █████╗  ██████╗██╗  ██╗██╗████████╗
    ██╔════╝██╔══██╗██╔════╝██║  ██║██║╚══██╔══╝
    ███████╗███████║██║     ███████║██║   ██║   
    ╚════██║██╔══██║██║     ██╔══██║██║   ██║   
    ███████║██║  ██║╚██████╗██║  ██║██║   ██║   
    ╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝   ╚═╝   
              `}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalLoader;