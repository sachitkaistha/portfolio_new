import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

const FloatingChat: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setShowMessage(true), 2000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setShowMessage(false);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Floating Message */}
      {showMessage && (
        <div className="absolute bottom-16 right-0 mb-2 mr-2 animate-bounce-in">
          <div className="bg-white dark:bg-slate-800 shadow-lg rounded-lg p-4 max-w-xs relative">
            <button
              onClick={handleDismiss}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="pr-4">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                👋 Let's build something amazing together!
              </p>
            </div>
            <div className="absolute bottom-0 right-6 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white dark:border-t-slate-800 transform translate-y-full"></div>
          </div>
        </div>
      )}
      
      {/* Floating Button */}
      <button className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center animate-pulse-slow">
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FloatingChat;