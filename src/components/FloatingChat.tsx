import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const FloatingChat: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Predefined responses for the chatbot
  const botResponses: { [key: string]: string } = {
    'hello': "Hi there! 👋 I'm Sachit's AI assistant. How can I help you today?",
    'hi': "Hello! 👋 I'm here to help you learn more about Sachit. What would you like to know?",
    'help': "I can help you with information about:\n• Sachit's experience and skills\n• His projects and achievements\n• Contact information\n• Technical expertise\n\nJust ask me anything!",
    'experience': "Sachit has 2.7 years of PHP development experience and is currently transitioning into DevOps. He's skilled in Docker, Jenkins, AWS, and CI/CD pipelines.",
    'skills': "Sachit's key skills include:\n• DevOps: Docker, Jenkins, GitHub Actions, AWS\n• Backend: PHP, Laravel, MySQL\n• Tools: Git, Nginx, Bash scripting\n• Cloud: AWS services and infrastructure",
    'projects': "Sachit has worked on several impressive projects including:\n• DevFlow AI - Multi-tool dashboard\n• Remote Docker Manager\n• AI Story Co-Writer\n• Universal Code Generator\n\nWould you like to know more about any specific project?",
    'contact': "You can reach Sachit at:\n📧 skaistha16@gmail.com\n📱 +91 7876434370\n🔗 LinkedIn: linkedin.com/in/sachit-kaistha-306849190\n💻 GitHub: github.com/sachitkaistha",
    'education': "Sachit is currently pursuing MCA (2023-2025) and has completed BCA (2019-2022). He also has PHP development training and certifications.",
    'location': "Sachit is based in Chandigarh, India 🇮🇳",
    'hire': "Sachit is open to new opportunities! You can contact him directly or use the contact form on this website. He's particularly interested in DevOps and backend development roles.",
    'devops': "Sachit specializes in DevOps with expertise in:\n• CI/CD pipeline automation\n• Docker containerization\n• Cloud infrastructure (AWS)\n• Monitoring and deployment\n• Infrastructure as Code",
    'php': "Sachit has 2.7 years of professional PHP development experience, specializing in Laravel framework, MySQL databases, and API development.",
    'default': "That's an interesting question! For detailed information, I'd recommend checking out Sachit's portfolio sections or contacting him directly at skaistha16@gmail.com. Is there anything specific about his experience or projects you'd like to know?"
  };

  const quickReplies = [
    "Tell me about his experience",
    "What are his skills?",
    "Show me his projects",
    "How can I contact him?",
    "Is he available for hire?"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setTimeout(() => setShowWelcome(true), 2000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim();
    
    // Check for exact matches first
    if (botResponses[message]) {
      return botResponses[message];
    }
    
    // Check for partial matches
    for (const [key, response] of Object.entries(botResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }
    
    // Check for common variations
    if (message.includes('about') || message.includes('who')) {
      return "Sachit is a passionate DevOps Engineer with 2.7 years of PHP development background. He specializes in automation, CI/CD, and cloud infrastructure. Currently pursuing MCA and always learning new technologies!";
    }
    
    if (message.includes('work') || message.includes('job') || message.includes('career')) {
      return "Sachit has worked as a PHP Developer for 2.7 years and is now transitioning to DevOps. He's experienced in building scalable web applications and automating deployment processes.";
    }
    
    if (message.includes('technology') || message.includes('tech') || message.includes('tools')) {
      return "Sachit works with modern technologies including Docker, Jenkins, AWS, PHP, Laravel, MySQL, and various DevOps tools. He's always exploring new technologies!";
    }

    return botResponses['default'];
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowWelcome(false);
    
    if (!isOpen && messages.length === 0) {
      // Add welcome message when opening for the first time
      setTimeout(() => {
        const welcomeMessage: Message = {
          id: Date.now(),
          text: "Hello! 👋 I'm Sachit's AI assistant. I can help you learn more about his experience, skills, and projects. What would you like to know?",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
      }, 500);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Welcome Message */}
      {showWelcome && !isOpen && (
        <div className="absolute bottom-20 right-0 mb-2 mr-2 animate-bounce-in">
          <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-4 max-w-xs relative border border-white/30 dark:border-slate-700/30">
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-xs"
            >
              ✕
            </button>
            <div className="pr-4">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                👋 Hi! I'm Sachit's AI assistant. Click to chat and learn more about his experience!
              </p>
            </div>
            <div className="absolute bottom-0 right-6 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white dark:border-t-slate-800 transform translate-y-full"></div>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`absolute bottom-20 right-0 w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-white/30 dark:border-slate-700/30 overflow-hidden transition-all duration-300 ${isMinimized ? 'h-16' : 'h-96'}`}>
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Sachit's AI Assistant</h3>
                <p className="text-white/80 text-xs">Online • Typically replies instantly</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleMinimize}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4 text-white" /> : <Minimize2 className="w-4 h-4 text-white" />}
              </button>
              <button
                onClick={toggleChat}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="h-64 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                        {message.sender === 'user' ? <User className="w-3 h-3 text-white" /> : <Bot className="w-3 h-3 text-white" />}
                      </div>
                      <div className={`rounded-2xl p-3 ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white'}`}>
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-white dark:bg-slate-700 rounded-2xl p-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 1 && (
                <div className="p-3 border-t border-slate-200 dark:border-slate-600">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-1">
                    {quickReplies.slice(0, 3).map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-600">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim()}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      
      {/* Floating Button */}
      <button 
        onClick={toggleChat}
        className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center animate-pulse-slow relative"
      >
        <MessageCircle className="w-6 h-6" />
        {!isOpen && messages.length > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
            {messages.filter(m => m.sender === 'bot').length}
          </div>
        )}
      </button>
    </div>
  );
};

export default FloatingChat;