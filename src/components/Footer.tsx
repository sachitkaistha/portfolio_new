import React from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  ExternalLink,
  User,
  Briefcase,
  Code,
  GraduationCap,
  Award,
  FolderOpen,
  MessageCircle
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Education', href: '#education', icon: GraduationCap },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Certifications', href: '#certifications', icon: Award },
    { name: 'Projects', href: '#projects', icon: FolderOpen },
    { name: 'Contact', href: '#contact', icon: MessageCircle }
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/sachitkaistha',
      icon: Github,
      color: 'hover:text-gray-400'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sachit-kaistha-306849190',
      icon: Linkedin,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      href: 'mailto:skaistha16@gmail.com',
      icon: Mail,
      color: 'hover:text-purple-400'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: 'skaistha16@gmail.com',
      href: 'mailto:skaistha16@gmail.com'
    },
    {
      icon: Phone,
      label: '+91 7876434370',
      href: 'tel:+917876434370'
    },
    {
      icon: MapPin,
      label: 'Chandigarh, India',
      href: 'https://maps.google.com/?q=Chandigarh,India'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-slate-900 dark:bg-slate-950 text-white overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Brand section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  Sachit
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Passionate DevOps Engineer and Backend Developer dedicated to building scalable, 
                  efficient solutions that bridge the gap between development and operations. 
                  Transforming ideas into robust digital experiences.
                </p>
              </div>
              
              {/* Social links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color} group`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h4 className="text-xl font-semibold mb-6 text-white">Quick Links</h4>
              <nav className="space-y-3">
                {quickLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <button
                      key={link.name}
                      onClick={() => scrollToSection(link.href)}
                      className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-200 group w-full text-left"
                    >
                      <IconComponent className="w-4 h-4 group-hover:text-blue-400 transition-colors duration-200" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h4 className="text-xl font-semibold mb-6 text-white">Contact Info</h4>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <a
                      key={index}
                      href={contact.href}
                      target={contact.icon === MapPin ? '_blank' : undefined}
                      rel={contact.icon === MapPin ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-200 group"
                    >
                      <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-blue-600 transition-colors duration-200">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {contact.label}
                      </span>
                      {contact.icon === MapPin && (
                        <ExternalLink className="w-3 h-3 opacity-50" />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Professional Summary */}
            <div className="lg:col-span-1">
              <h4 className="text-xl font-semibold mb-6 text-white">Professional Focus</h4>
              <div className="space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <h5 className="font-semibold text-blue-400 mb-2">DevOps Engineering</h5>
                  <p className="text-sm text-slate-300">
                    CI/CD pipelines, containerization, cloud infrastructure automation
                  </p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <h5 className="font-semibold text-purple-400 mb-2">Backend Development</h5>
                  <p className="text-sm text-slate-300">
                    PHP, Laravel, API development, database optimization
                  </p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <h5 className="font-semibold text-green-400 mb-2">Cloud Solutions</h5>
                  <p className="text-sm text-slate-300">
                    AWS services, scalable architecture, monitoring & alerting
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-slate-400">
                <span>&copy; {currentYear} Sachit Kaistha. Made with</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>using React & TypeScript</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <span>Available for freelance projects</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Open to opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-10 right-10 opacity-20">
          <Code className="w-16 h-16 text-blue-400 animate-float" />
        </div>
        <div className="absolute bottom-20 left-10 opacity-20">
          <Briefcase className="w-12 h-12 text-purple-400 animate-float-delayed" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;