import React, { useState, useEffect } from 'react';
import { Github, Star, GitFork, Users, BookOpen } from 'lucide-react';

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  total_forks: number;
  contributions: number;
}

const GitHubStats: React.FC = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch('https://api.github.com/users/sachitkaistha');
        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch('https://api.github.com/users/sachitkaistha/repos?per_page=100');
        const reposData = await reposResponse.json();

        // Calculate total stars and forks
        const totalStars = reposData.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
        const totalForks = reposData.reduce((sum: number, repo: any) => sum + repo.forks_count, 0);

        // For contributions, we'll use a placeholder since the GitHub API requires authentication for this
        // In a real implementation, you'd need to use GitHub's GraphQL API with authentication
        const contributions = 500; // Placeholder value

        setStats({
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          total_stars: totalStars,
          total_forks: totalForks,
          contributions: contributions
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching GitHub stats:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-lg p-6 flex flex-col items-center gap-2 border border-white/30 dark:border-slate-700/30">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-700 dark:text-slate-200">
          <Github className="w-5 h-5 animate-spin" />
          GitHub Stats
        </div>
        <div className="flex gap-6 mt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-8 h-6 bg-slate-200 dark:bg-slate-600 rounded animate-pulse"></div>
              <div className="w-12 h-3 bg-slate-200 dark:bg-slate-600 rounded mt-1 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-lg p-6 flex flex-col items-center gap-2 border border-white/30 dark:border-slate-700/30">
        <div className="flex items-center gap-2 text-lg font-semibold text-slate-700 dark:text-slate-200">
          <Github className="w-5 h-5" />
          GitHub Stats
        </div>
        <div className="flex gap-6 mt-2 text-slate-600 dark:text-slate-300">
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl">--</span>
            <span className="text-xs">Repos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl">--</span>
            <span className="text-xs">Stars</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-xl">--</span>
            <span className="text-xs">Followers</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 rounded-2xl shadow-lg p-6 border border-white/30 dark:border-slate-700/30 hover:scale-105 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center gap-2 text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">
        <Github className="w-5 h-5" />
        GitHub Stats
      </div>
      
      {/* Main Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-1 mb-1">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span className="font-bold text-xl text-slate-800 dark:text-white">{stats.public_repos}</span>
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-300">Repos</span>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-bold text-xl text-slate-800 dark:text-white">{stats.total_stars}</span>
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-300">Stars</span>
        </div>
        
        <div className="flex flex-col items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center gap-1 mb-1">
            <Users className="w-4 h-4 text-green-500" />
            <span className="font-bold text-xl text-slate-800 dark:text-white">{stats.followers}</span>
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-300">Followers</span>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
          <div className="flex items-center gap-2">
            <GitFork className="w-3 h-3 text-slate-500" />
            <span className="text-slate-600 dark:text-slate-300">Forks</span>
          </div>
          <span className="font-semibold text-slate-800 dark:text-white">{stats.total_forks}</span>
        </div>
        
        <div className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="w-3 h-3 text-slate-500" />
            <span className="text-slate-600 dark:text-slate-300">Following</span>
          </div>
          <span className="font-semibold text-slate-800 dark:text-white">{stats.following}</span>
        </div>
      </div>

      {/* GitHub Profile Link */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-600">
        <a
          href="https://github.com/sachitkaistha"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
        >
          <Github className="w-4 h-4" />
          View GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default GitHubStats;