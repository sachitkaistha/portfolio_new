import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, Rss } from 'lucide-react';
import LazyImage from './LazyImage';

interface BlogPost {
  id: string;
  title: string;
  snippet: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  link: string;
}

const RecentUpdates: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'Mastering Docker Containerization for DevOps',
        snippet: 'Learn how to effectively use Docker containers to streamline your development and deployment processes...',
        date: '2024-01-15',
        readTime: '5 min read',
        category: 'DevOps',
        image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
        link: '/blog/docker-containerization'
      },
      {
        id: '2',
        title: 'Building Scalable APIs with Laravel',
        snippet: 'Best practices for creating robust and scalable REST APIs using Laravel framework and modern PHP...',
        date: '2024-01-10',
        readTime: '7 min read',
        category: 'Backend',
        image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
        link: '/blog/laravel-apis'
      },
      {
        id: '3',
        title: 'CI/CD Pipeline Automation with GitHub Actions',
        snippet: 'Step-by-step guide to setting up automated deployment pipelines using GitHub Actions for faster delivery...',
        date: '2024-01-05',
        readTime: '6 min read',
        category: 'Automation',
        image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
        link: '/blog/github-actions-cicd'
      }
    ];

    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-4 max-w-md mx-auto"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse max-w-2xl mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-morphism rounded-2xl p-6 animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="flex gap-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rss className="w-8 h-8 text-blue-500" />
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">
              Recent Updates
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with my latest thoughts on development, DevOps, and technology trends.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="glass-morphism rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 group cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {post.image && (
                <div className="relative h-48 overflow-hidden">
                  <LazyImage
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-500 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.snippet}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <a
                  href={post.link}
                  className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium group-hover:gap-3 transition-all duration-300"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/blog"
            className="neu-morphism inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 gradient-bg-2 text-white"
          >
            <Rss className="w-5 h-5" />
            View All Posts
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecentUpdates;