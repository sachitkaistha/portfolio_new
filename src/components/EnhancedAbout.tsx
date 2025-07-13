import React, { useState, useEffect, useRef } from 'react';
import { Heart, Target, Zap, Users, Award, ArrowRight } from 'lucide-react';
import LazyImage from './LazyImage';

const EnhancedAbout: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
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

  const tabs = [
    {
      id: 0,
      title: 'My Story',
      icon: Heart,
      content: {
        title: 'From Code to Cloud',
        description: `My journey began with a curiosity about how websites work, which led me to dive deep into PHP development. Over 2.7 years, I built robust web applications and mastered the art of clean, efficient code. But I wanted more – I wanted to understand the entire ecosystem.

        The transition to DevOps felt natural. It combined my love for development with the excitement of infrastructure automation. Now, I bridge the gap between development and operations, creating seamless pipelines that empower teams to ship faster and more reliably.

        What drives me is the belief that technology should simplify, not complicate. Every line of code I write, every pipeline I build, is aimed at making developers' lives easier and businesses more efficient.`
      }
    },
    {
      id: 1,
      title: 'What Sets Me Apart',
      icon: Target,
      content: {
        title: 'Unique Value Proposition',
        description: `**Speed & Precision**: I don't just deliver fast – I deliver fast AND right. My development background gives me insights into what developers actually need from infrastructure.

        **Full-Stack Thinking**: Unlike pure DevOps engineers, I understand the application layer deeply. This means I can optimize not just deployment, but the entire development experience.

        **Problem-First Approach**: I don't just implement tools because they're trendy. I identify real problems and craft solutions that actually solve them.

        **Continuous Learning**: Technology evolves rapidly, and so do I. I'm currently pursuing advanced certifications and exploring AI integration in DevOps workflows.`
      }
    },
    {
      id: 2,
      title: 'Core Values',
      icon: Zap,
      content: {
        title: 'What Drives My Work',
        description: `**Reliability**: Systems should work when you need them most. I build with redundancy and monitoring in mind.

        **Simplicity**: Complex problems often have simple solutions. I believe in elegant, maintainable approaches over clever hacks.

        **Collaboration**: The best solutions come from diverse perspectives. I actively seek feedback and love working with cross-functional teams.

        **Growth Mindset**: Every challenge is an opportunity to learn. I embrace failures as stepping stones to better solutions.

        **Impact**: Technology should make a positive difference. I'm passionate about building systems that enable others to do their best work.`
      }
    }
  ];

  const achievements = [
    {
      icon: Users,
      title: '50+ Projects',
      description: 'Successfully delivered across various domains'
    },
    {
      icon: Zap,
      title: '80% Faster',
      description: 'Average deployment time reduction achieved'
    },
    {
      icon: Award,
      title: '99.9% Uptime',
      description: 'Maintained across production systems'
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              About Me
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate about building bridges between development and operations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Professional Image */}
            <div className="relative">
              <div className="glass-morphism rounded-2xl p-8 text-center">
                <div className="w-64 h-64 mx-auto mb-6 relative">
                  <div className="absolute inset-0 gradient-bg-1 rounded-full blur-xl opacity-30"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-6xl font-bold">
                    S
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Sachit Kaistha
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  DevOps Engineer & Backend Developer
                </p>
                <div className="flex justify-center gap-4">
                  {achievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div key={index} className="text-center">
                        <IconComponent className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {achievement.title}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {achievement.description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tabbed Content */}
            <div className="space-y-6">
              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`neu-morphism flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'gradient-bg-1 text-white scale-105'
                          : 'hover:scale-105'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{tab.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="glass-morphism rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {tabs[activeTab].content.title}
                </h3>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {tabs[activeTab].content.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {paragraph.split('**').map((part, partIndex) => 
                        partIndex % 2 === 1 ? (
                          <strong key={partIndex} className="text-gray-900 dark:text-white font-semibold">
                            {part}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="glass-morphism rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Work Together?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Let's discuss how I can help streamline your development processes and build robust, scalable solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="neu-morphism px-8 py-4 rounded-xl font-bold text-lg gradient-bg-1 text-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Let's Connect
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="/resume.pdf"
                  download
                  className="neu-morphism px-8 py-4 rounded-xl font-bold text-lg border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedAbout;