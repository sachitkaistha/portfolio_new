import React, { useState } from 'react';
import { ExternalLink, Github, Play, Code, Star } from 'lucide-react';
import LazyImage from './LazyImage';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

interface ResponsiveProjectCardProps {
  project: Project;
  index: number;
}

const ResponsiveProjectCard: React.FC<ResponsiveProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div
        className={`glass-morphism rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 group cursor-pointer ${
          project.featured ? 'ring-2 ring-blue-500' : ''
        }`}
        style={{ animationDelay: `${index * 150}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowDetails(true)}
      >
        {/* Project Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          {project.image ? (
            <LazyImage
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full gradient-bg-1 flex items-center justify-center">
              <Code className="w-16 h-16 text-white opacity-50" />
            </div>
          )}
          
          {/* Overlay */}
          <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute inset-0 flex items-center justify-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="neu-morphism p-3 rounded-full text-white hover:scale-110 transition-all duration-300"
                >
                  <Play className="w-5 h-5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="neu-morphism p-3 rounded-full text-white hover:scale-110 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(true);
                }}
                className="neu-morphism p-3 rounded-full text-white hover:scale-110 transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
              {project.category}
            </span>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full">
                <Star className="w-3 h-3" />
                Featured
              </div>
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-500 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm sm:text-base">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 4).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(true);
              }}
              className="flex-1 neu-morphism py-2 px-4 rounded-lg text-sm font-medium hover:scale-105 transition-all duration-300"
            >
              View Details
            </button>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="neu-morphism p-2 rounded-lg hover:scale-105 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="glass-morphism rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                    {project.category}
                  </span>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="neu-morphism w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                >
                  ✕
                </button>
              </div>

              {/* Project Image */}
              {project.image && (
                <div className="mb-6 rounded-xl overflow-hidden">
                  <LazyImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                </div>
              )}

              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Project Overview
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neu-morphism flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold gradient-bg-1 text-white hover:scale-105 transition-all duration-300"
                      >
                        <Play className="w-5 h-5" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="neu-morphism flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold border-2 border-gray-300 dark:border-gray-600 hover:scale-105 transition-all duration-300"
                      >
                        <Github className="w-5 h-5" />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResponsiveProjectCard;