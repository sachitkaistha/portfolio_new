import React, { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Github, Linkedin, User, MessageSquare, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // EmailJS configuration
      const serviceId = 'service_portfolio'; // You'll need to replace this
      const templateId = 'template_contact'; // You'll need to replace this
      const publicKey = 'YOUR_PUBLIC_KEY'; // You'll need to replace this

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: 'skaistha16@gmail.com',
        message: formData.message,
        reply_to: formData.email,
        subject: `Portfolio Contact: Message from ${formData.name}`,
        timestamp: new Date().toLocaleString()
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (result.status === 200) {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (err) {
      console.error('Email sending error:', err);
      setIsSubmitting(false);
      setError('Failed to send message. Please try contacting me directly via email or phone.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'skaistha16@gmail.com',
      href: 'mailto:skaistha16@gmail.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 7876434370',
      href: 'tel:+917876434370',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Chandigarh, India',
      href: 'https://maps.google.com/?q=Chandigarh,India',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-28 px-6 relative overflow-hidden min-h-[80vh] flex items-center justify-center">
      {/* Animated SVG Accent - Purple/Blue */}
      <svg className="absolute left-0 top-0 w-full h-full -z-10 opacity-40" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="contact-gradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <path fill="url(#contact-gradient)" fillOpacity="0.18" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
      </svg>
      
      {/* Floating Mail Icon */}
      <Mail className="absolute left-1/2 -translate-x-1/2 top-10 w-16 h-16 text-purple-400 opacity-30 animate-float" />
      
      <div className="container mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <MessageSquare className="w-10 h-10 text-purple-400" />
              <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient-move">
                Let's Connect
              </h2>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss how we can work together to create something amazing.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Contact Information Cards */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-card p-8 rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/30 backdrop-blur-2xl bg-white/60 dark:bg-slate-800/60">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <a
                        key={index}
                        href={info.href}
                        target={info.label === 'Location' ? '_blank' : undefined}
                        rel={info.label === 'Location' ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-4 p-4 bg-white/50 dark:bg-slate-700/50 rounded-2xl hover:bg-white/70 dark:hover:bg-slate-600/70 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                      >
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${info.color} group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            {info.label}
                          </p>
                          <p className="text-lg font-semibold text-slate-800 dark:text-white">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-600">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4 text-center">
                    Follow me on
                  </p>
                  <div className="flex justify-center gap-4">
                    <a 
                      href="https://github.com/sachitkaistha" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gradient-to-br from-slate-800 to-slate-600 text-white shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/sachit-kaistha-306849190" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a 
                      href="mailto:skaistha16@gmail.com"
                      className="p-3 rounded-full bg-gradient-to-br from-purple-600 to-purple-500 text-white shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass-card p-8 md:p-10 rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700/30 backdrop-blur-2xl bg-white/60 dark:bg-slate-800/60">
                <div className="flex items-center gap-3 mb-8">
                  <Send className="w-8 h-8 text-purple-400" />
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                    Send me a message
                  </h3>
                </div>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <p className="text-green-800 dark:text-green-200">
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl">
                    <p className="text-red-800 dark:text-red-200">{error}</p>
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white/30 dark:border-slate-700/30 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white/30 dark:border-slate-700/30 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white/30 dark:border-slate-700/30 focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-all resize-none text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
                      placeholder="Tell me about your project, ideas, or just say hello..."
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 text-white font-bold text-lg rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      I'll respond within 24 hours
                    </p>
                  </div>
                </form>

                {/* Alternative contact methods */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-600">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">
                    Prefer direct contact?
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="mailto:skaistha16@gmail.com"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200"
                    >
                      <Mail className="w-4 h-4" />
                      Email Me
                    </a>
                    <a
                      href="tel:+917876434370"
                      className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors duration-200"
                    >
                      <Phone className="w-4 h-4" />
                      Call Me
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;