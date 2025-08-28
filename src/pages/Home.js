import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { FaThumbsUp, FaEye, FaComment, FaUser, FaClock, FaBookmark } from 'react-icons/fa';

const Home = ({ searchQuery, selectedCategory }) => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('new');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let query = supabase.from('posts').select('*');

        if (selectedCategory !== 'All') {
          query = query.eq('category', selectedCategory);
        }

        if (searchQuery) {
          const searchTerms = searchQuery.toLowerCase().split(',');
          query = query.or(
            `title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%,tags.cs.{${searchTerms.join(',')}}`
          );
        }

        if (sortBy === 'new') {
          query = query.order('created_at', { ascending: false });
        } else if (sortBy === 'upvotes') {
          query = query.order('upvotes', { ascending: false });
        } else if (sortBy === 'views') {
          query = query.order('views', { ascending: false });
        }

        const { data, error } = await query;
        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        setError('Failed to load posts. Please try again.');
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, [searchQuery, selectedCategory, sortBy]);

  // Generate avatar initials from post title or category
  const getAvatarInitials = (title, category) => {
    if (title) {
      return title.split(' ').slice(0, 2).map(word => word[0]).join('').toUpperCase();
    }
    return category ? category.split(' ').slice(0, 2).map(word => word[0]).join('').toUpperCase() : 'DC';
  };

  // Format relative time
  const getRelativeTime = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  // Generate a consistent color for avatars
  const getAvatarColor = (title) => {
    const colors = [
      'bg-dickinsonRed',
      'bg-dickinsonGold',
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500'
    ];
    const index = title.length % colors.length;
    return colors[index];
  };

  return (
    <div>
      {/* Pill-shaped Filter Tabs */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-2 mb-8 shadow-sm border border-white/20">
        <div className="flex space-x-1">
          <button
            onClick={() => setSortBy('new')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-dickinsonRed ${
              sortBy === 'new'
                ? 'bg-dickinsonRed text-white shadow-md'
                : 'text-[var(--text-color)] hover:bg-white/80 hover:text-dickinsonRed'
            }`}
            aria-label="Sort by newest"
          >
            <span className="flex items-center justify-center gap-2">
              <FaClock className="text-sm" />
              New
            </span>
          </button>
          <button
            onClick={() => setSortBy('upvotes')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-dickinsonRed ${
              sortBy === 'upvotes'
                ? 'bg-dickinsonRed text-white shadow-md'
                : 'text-[var(--text-color)] hover:bg-white/80 hover:text-dickinsonRed'
            }`}
            aria-label="Sort by most upvoted"
          >
            <span className="flex items-center justify-center gap-2">
              <FaThumbsUp className="text-sm" />
              Most Upvoted
            </span>
          </button>
          <button
            onClick={() => setSortBy('views')}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-dickinsonRed ${
              sortBy === 'views'
                ? 'bg-dickinsonRed text-white shadow-md'
                : 'text-[var(--text-color)] hover:bg-white/80 hover:text-dickinsonRed'
            }`}
            aria-label="Sort by most viewed"
          >
            <span className="flex items-center justify-center gap-2">
              <FaEye className="text-sm" />
              Most Viewed
            </span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6 shadow-sm" role="alert">
          Error: {error}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto shadow-lg">
            <h3 className="text-xl font-bold text-dickinsonRed mb-2">No posts found</h3>
            <p className="text-[var(--text-color)] mb-6">Create one to get started!</p>
            <Link
              to="/create"
              className="inline-block bg-dickinsonRed text-white px-6 py-3 rounded-xl font-semibold hover:bg-dickinsonGold hover:text-dickinsonRed hover:shadow-lg transform hover:scale-105 transition-all duration-300 shadow-md"
            >
              Create Post
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              to={`/post/${post.id}`}
              key={post.id}
              className="group block bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 overflow-hidden border border-white/20"
              aria-label={`View post: ${post.title}`}
            >
              <div className="p-6">
                {/* Header with Avatar and Meta Info */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full ${getAvatarColor(post.title)} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                    {getAvatarInitials(post.title, post.category)}
                  </div>
                  
                  {/* Post Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-serif font-bold text-dickinsonRed group-hover:text-dickinsonGold transition-colors duration-300 truncate">
                        {post.title}
                      </h2>
                      {post.pinned && (
                        <span className="bg-dickinsonGold text-dickinsonRed px-2 py-1 rounded-full text-xs font-bold shadow-sm flex-shrink-0">
                          PINNED
                        </span>
                      )}
                    </div>
                    
                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <FaUser className="text-xs" />
                        <span>Anonymous</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        <span>{getRelativeTime(post.created_at)}</span>
                      </span>
                      <span className="bg-dickinsonRed/10 text-dickinsonRed px-2 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Preview */}
                <p className="text-[var(--text-color)] line-clamp-3 mb-4 leading-relaxed text-gray-700">
                  {post.content}
                </p>
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-dickinsonGold/20 text-dickinsonRed px-3 py-1 rounded-full text-sm font-medium border border-dickinsonGold/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Engagement Metrics */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2 text-sm text-gray-600 hover:text-dickinsonRed transition-colors duration-200">
                      <FaThumbsUp className="text-sm" />
                      <span className="font-medium">{post.upvotes || 0}</span>
                    </span>
                    <span className="flex items-center gap-2 text-sm text-gray-600 hover:text-dickinsonRed transition-colors duration-200">
                      <FaEye className="text-sm" />
                      <span className="font-medium">{post.views || 0}</span>
                    </span>
                    <span className="flex items-center gap-2 text-sm text-gray-600 hover:text-dickinsonRed transition-colors duration-200">
                      <FaComment className="text-sm" />
                      <span className="font-medium">0</span>
                    </span>
                  </div>
                  
                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="p-2 text-gray-400 hover:text-dickinsonGold hover:bg-dickinsonGold/10 rounded-lg transition-all duration-200"
                    aria-label="Bookmark post"
                  >
                    <FaBookmark className="text-sm" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;