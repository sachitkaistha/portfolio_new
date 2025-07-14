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
    'hey': "Hey! 👋 Great to meet you! I'm here to tell you all about Sachit's amazing work. What interests you most?",
    'help': "I can help you with information about:\n• Sachit's experience and skills\n• His projects and achievements\n• Contact information\n• Technical expertise\n\nJust ask me anything!",
    'experience': "Sachit has 2.7 years of PHP development experience and is currently transitioning into DevOps. He's skilled in Docker, Jenkins, AWS, and CI/CD pipelines. He's worked on everything from e-commerce platforms to automated deployment systems!",
    'work': "Sachit's professional journey is quite impressive! He started as a PHP developer, building robust web applications for 2.7 years. Now he's evolved into DevOps, focusing on automation and cloud infrastructure. He loves solving complex problems!",
    'background': "Sachit comes from a strong technical background with hands-on experience in both development and operations. He believes in bridging the gap between dev and ops teams to create seamless workflows.",
    'skills': "Sachit's key skills include:\n• DevOps: Docker, Jenkins, GitHub Actions, AWS\n• Backend: PHP, Laravel, MySQL\n• Tools: Git, Nginx, Bash scripting\n• Cloud: AWS services and infrastructure\n\nHe's always learning new technologies!",
    'technologies': "Sachit works with cutting-edge technologies! His toolkit includes Docker for containerization, Jenkins for CI/CD, AWS for cloud infrastructure, PHP/Laravel for backend development, and much more. He's particularly excited about automation!",
    'tools': "His favorite tools? Docker for sure! Also Jenkins for automation, GitHub Actions for workflows, AWS for cloud services, and good old Bash for scripting. He believes the right tools make all the difference!",
    'projects': "Sachit has worked on several impressive projects including:\n• DevFlow AI - Multi-tool dashboard with AI integration\n• Remote Docker Manager - SSH-based container management\n• AI Story Co-Writer - Creative writing assistant\n• Universal Code Generator - Multi-language code generation\n\nWould you like to know more about any specific project?",
    'devflow': "DevFlow AI is Sachit's flagship project! It's a comprehensive multi-tool dashboard that combines AI capabilities with DevOps automation. Features include remote Docker management, AI-powered tools, and a beautiful glassmorphism interface. It's built with Python and Streamlit!",
    'docker': "Sachit loves Docker! He's built a Remote Docker Manager that lets you manage containers over SSH through a web interface. It's perfect for managing remote servers securely. He's also integrated Docker into many of his automation workflows.",
    'ai': "Sachit is really into AI integration! He's built an AI Story Co-Writer using Google Gemini API, and a Universal Code Generator that can create code in multiple programming languages. He sees AI as the future of development productivity!",
    'contact': "You can reach Sachit at:\n📧 skaistha16@gmail.com\n📱 +91 7876434370\n🔗 LinkedIn: linkedin.com/in/sachit-kaistha-306849190\n💻 GitHub: github.com/sachitkaistha\n\nHe's very responsive and loves connecting with fellow tech enthusiasts!",
    'email': "Sachit's email is skaistha16@gmail.com - he checks it regularly and usually responds within 24 hours. Feel free to reach out about opportunities, collaborations, or just to chat about tech!",
    'phone': "You can call Sachit at +91 7876434370. He's based in Chandigarh, India (IST timezone). He's always happy to discuss projects and opportunities!",
    'education': "Sachit is currently pursuing MCA (2023-2025) and has completed BCA (2019-2022). He also has specialized PHP development training and is working on advanced DevOps certifications. He believes in continuous learning!",
    'mca': "Sachit is currently in his MCA program (2023-2025), focusing on advanced computer applications and emerging technologies. It's helping him stay current with the latest tech trends!",
    'bca': "Sachit completed his BCA (2019-2022) which gave him a solid foundation in computer science fundamentals. That's where his programming journey really took off!",
    'location': "Sachit is based in Chandigarh, India 🇮🇳 - a beautiful city known for its planned architecture and tech scene. He's open to remote work and relocation opportunities!",
    'chandigarh': "Chandigarh is an amazing city! It's well-planned, clean, and has a growing tech community. Sachit loves the work-life balance it offers while being connected to major tech hubs.",
    'hire': "Sachit is definitely open to new opportunities! He's particularly interested in DevOps and backend development roles. You can contact him directly or use the contact form. He's looking for challenging projects where he can make a real impact!",
    'available': "Yes! Sachit is actively looking for exciting opportunities in DevOps and backend development. He's passionate about automation, cloud infrastructure, and building scalable systems. Reach out if you have something interesting!",
    'job': "Sachit is open to both full-time positions and freelance projects. He's particularly excited about roles involving DevOps automation, cloud infrastructure, or backend development. He loves challenges and learning new technologies!",
    'devops': "Sachit specializes in DevOps with expertise in:\n• CI/CD pipeline automation with Jenkins & GitHub Actions\n• Docker containerization and orchestration\n• AWS cloud infrastructure management\n• Infrastructure monitoring and deployment\n• Bash scripting and automation\n\nHe's passionate about making development workflows seamless!",
    'cicd': "CI/CD is one of Sachit's favorite areas! He's built automated pipelines using Jenkins and GitHub Actions that have reduced deployment times by 80%. He believes automation is key to reliable software delivery.",
    'aws': "Sachit has hands-on experience with AWS services including EC2, S3, RDS, and more. He's built scalable cloud infrastructure and loves the flexibility AWS provides for modern applications.",
    'cloud': "Cloud computing is the future, and Sachit is all in! He specializes in AWS but is always exploring other cloud platforms. He's built everything from simple web apps to complex multi-tier architectures in the cloud.",
    'php': "Sachit has 2.7 years of professional PHP development experience! He's specialized in Laravel framework, built e-commerce platforms, APIs, and complex web applications. He loves PHP's flexibility and the Laravel ecosystem.",
    'laravel': "Laravel is Sachit's go-to PHP framework! He's built numerous applications with it, from simple websites to complex enterprise systems. He loves its elegant syntax and powerful features like Eloquent ORM and Artisan commands.",
    'mysql': "Database design is one of Sachit's strengths! He's worked extensively with MySQL, designing efficient schemas, optimizing queries, and ensuring data integrity. He understands the importance of good database architecture.",
    'github': "Check out Sachit's GitHub at github.com/sachitkaistha! You'll find his latest projects including DevFlow AI, Docker managers, AI tools, and more. He believes in open source and sharing knowledge with the community.",
    'linkedin': "Connect with Sachit on LinkedIn: linkedin.com/in/sachit-kaistha-306849190. He regularly shares insights about DevOps, development, and tech trends. He loves networking with fellow professionals!",
    'portfolio': "This portfolio showcases Sachit's journey from PHP developer to DevOps engineer! You can explore his projects, skills, experience, and get in touch. It's built with React and features some cool animations and a chatbot (that's me!).",
    'website': "This website is actually one of Sachit's projects! It's a modern React portfolio with TypeScript, Tailwind CSS, and lots of interactive features. The design focuses on user experience and showcases his technical skills.",
    'salary': "For salary discussions, it's best to contact Sachit directly. He's open to discussing compensation based on the role, responsibilities, and company. He values fair compensation and growth opportunities!",
    'remote': "Sachit is absolutely open to remote work! He's experienced with remote collaboration tools and believes in the power of distributed teams. Location is no barrier to great work!",
    'freelance': "Yes! Sachit takes on freelance projects, especially those involving DevOps automation, backend development, or interesting technical challenges. Feel free to reach out with your project ideas!",
    'consulting': "Sachit offers consulting services for DevOps transformation, automation strategies, and technical architecture. He loves helping teams improve their development workflows and deployment processes.",
    'default': "That's an interesting question! I'd love to help you learn more about Sachit. You can ask me about his experience, projects, skills, or how to get in touch. What specific aspect interests you most?"
  };

  const quickReplies = [
    "What's his experience?",
    "Tell me about his projects",
    "How can I contact him?",
    "Is he available for hire?",
    "What technologies does he use?"
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
    if (message.includes('about') || message.includes('who') || message.includes('tell me')) {
      return "Sachit is a passionate DevOps Engineer with 2.7 years of PHP development background. He specializes in automation, CI/CD, and cloud infrastructure. He's built amazing projects like DevFlow AI and loves solving complex technical challenges!";
    }
    
    if (message.includes('what does he do') || message.includes('profession')) {
      return "Sachit is a DevOps Engineer and Backend Developer! He builds automation tools, manages cloud infrastructure, and creates amazing applications. He's passionate about making development workflows more efficient!";
    }
    
    if (message.includes('technology') || message.includes('tech') || message.includes('stack')) {
      return "Sachit's tech stack is impressive! He works with Docker, Jenkins, AWS, PHP, Laravel, MySQL, Python, React, and many more. He's particularly excited about AI integration and automation tools!";
    }
    
    if (message.includes('learn') || message.includes('study') || message.includes('education')) {
      return "Sachit is currently pursuing MCA (2023-2025) and has completed BCA. He's also earned certifications in PHP development and is working on advanced DevOps certifications. He believes in lifelong learning!";
    }
    
    if (message.includes('project') && message.includes('favorite')) {
      return "DevFlow AI is definitely Sachit's favorite project! It's a comprehensive multi-tool dashboard that combines AI with DevOps automation. It showcases his skills in Python, AI integration, and modern UI design.";
    }
    
    if (message.includes('why') && (message.includes('hire') || message.includes('choose'))) {
      return "Great question! Sachit brings a unique combination of development and operations expertise. He's passionate about automation, has a proven track record of improving deployment efficiency, and loves solving complex technical challenges. Plus, he's always eager to learn and adapt!";
    }
    
    if (message.includes('future') || message.includes('goals') || message.includes('plans')) {
      return "Sachit is excited about the future of DevOps and AI! He plans to continue building innovative automation tools, exploring AI integration in development workflows, and helping teams achieve faster, more reliable deployments. He's always looking for the next big challenge!";
    }
    
    if (message.includes('hobby') || message.includes('interests') || message.includes('free time')) {
      return "When not coding, Sachit loves exploring new technologies, contributing to open source projects, and staying updated with the latest tech trends. He's also passionate about sharing knowledge and helping other developers grow!";
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
    const typingDelay = 800 + Math.random() * 700;
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
    }, typingDelay);
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