import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

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

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setSortBy('new')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-dickinsonRed ${
            sortBy === 'new'
              ? 'bg-dickinsonRed text-white'
              : 'bg-[var(--card-bg)] text-[var(--text-color)] hover:bg-dickinsonGold hover:text-dickinsonRed'
          }`}
          aria-label="Sort by newest"
        >
          New
        </button>
        <button
          onClick={() => setSortBy('upvotes')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-dickinsonRed ${
            sortBy === 'upvotes'
              ? 'bg-dickinsonRed text-white'
              : 'bg-[var(--card-bg)] text-[var(--text-color)] hover:bg-dickinsonGold hover:text-dickinsonRed'
          }`}
          aria-label="Sort by most upvoted"
        >
          Most Upvoted
        </button>
        <button
          onClick={() => setSortBy('views')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-dickinsonRed ${
            sortBy === 'views'
              ? 'bg-dickinsonRed text-white'
              : 'bg-[var(--card-bg)] text-[var(--text-color)] hover:bg-dickinsonGold hover:text-dickinsonRed'
          }`}
          aria-label="Sort by most viewed"
        >
          Most Viewed
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4" role="alert">
          Error: {error}
        </div>
      )}

      {posts.length === 0 ? (
        <p className="text-[var(--text-color)]">No posts found. Create one to get started!</p>
      ) : (
        posts.map((post) => (
          <Link
            to={`/post/${post.id}`}
            key={post.id}
            className="block bg-[var(--card-bg)] rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transform hover:scale-101 transition-all duration-300"
            aria-label={`View post: ${post.title}`}
          >
            <h2 className="text-xl font-serif font-bold text-dickinsonRed mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-2">
              Posted on: {new Date(post.created_at).toLocaleString()} | Major: {post.category}
            </p>
            <p className="text-[var(--text-color)] line-clamp-3">{post.content}</p>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-dickinsonGold text-dickinsonRed px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {post.pinned && (
              <span className="inline-block bg-dickinsonRed text-white px-2 py-1 rounded-full text-sm mt-2">
                Pinned
              </span>
            )}
          </Link>
        ))
      )}
    </div>
  );
};

export default Home;