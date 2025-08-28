import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Home from './pages/Home';
import Post from './pages/Post';
import CreatePost from './components/CreatePost';
import Settings from './components/Settings';
import About from './pages/About';
import MajorsFilter from './components/MajorsFilter';
import Navigation from './components/Navigation';
import { FaArrowUp, FaUsers, FaLightbulb, FaGraduationCap, FaRocket } from 'react-icons/fa';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          const { data: { user }, error } = await supabase.auth.signInAnonymously();
          if (error) throw error;
          console.log('Anonymous user signed in:', user);
        } else {
          console.log('Existing session found:', session.user);
        }
      } catch (err) {
        setAuthError('Failed to authenticate. Please try again or contact support.');
        console.error('Authentication error:', err);
      }
    };

    const fetchTrendingPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('upvotes', { ascending: false })
          .limit(4);
        
        if (error) throw error;
        setTrendingPosts(data || []);
      } catch (err) {
        console.error('Error fetching trending posts:', err);
      }
    };

    initializeAuth();
    fetchTrendingPosts();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
    });

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Theme management
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const categories = [
    'All',
    'Africana Studies',
    'American Studies',
    'Anthropology',
    'Arabic',
    'Archaeology',
    'Art & Art History',
    'Astronomy',
    'Biochemistry & Molecular Biology',
    'Biology',
    'Business',
    'Chemistry',
    'Chinese',
    'Classical Studies',
    'Computer Science',
    'Creative Writing',
    'Dance',
    'Data Analytics',
    'East Asian Studies',
    'Economics',
    'Educational Studies',
    'Engineering',
    'English',
    'Environmental Studies',
    'Ethics',
    'Film & Media Studies',
    'Food Studies',
    'French & Francophone Studies',
    'Geosciences',
    'German',
    'Greek',
    'Health Studies',
    'Hebrew',
    'History',
    'Humanities',
    'Interdisciplinary Studies',
    'International Business & Management',
    'International Studies',
    'Italian & Italian Studies',
    'Japanese',
    'Journalism',
    'Judaic Studies',
    'Latin',
    'Latin American, Latinx & Caribbean Studies',
    'Law & Policy',
    'Mathematics',
    'Medieval & Early Modern Studies',
    'Middle East Studies',
    'Military Science & ROTC',
    'Music',
    'Neuroscience',
    'Philosophy',
    'Physics',
    'Political Science',
    'Portuguese & Brazilian Studies',
    'Psychology',
    'Quantitative Economics',
    'Religion',
    'Russian',
    'Science, Technology & Culture',
    'Security Studies',
    'Self-Developed',
    'Sexuality Studies',
    'Sociology',
    'Spanish',
    'Sustainability',
    'Theatre',
    'Womens, Gender & Sexuality Studies',
    'Writing Program',
  ];

  return (
    <Router>
      <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] font-sans">
        {/* Modern Navigation */}
        <Navigation theme={theme} toggleTheme={toggleTheme} />

        {authError && (
          <div className="container mx-auto px-4 py-2 bg-red-100 text-red-700" role="alert">
            {authError}
          </div>
        )}

        <Switch>
          <Route exact path="/">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-dickinsonRed/10 via-dickinsonGold/5 to-dickinsonRed/10"></div>
              
              {/* Subtle campus imagery overlay */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 bg-dickinsonRed rounded-full blur-3xl"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-dickinsonGold rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-dickinsonRed rounded-full blur-2xl"></div>
              </div>

              <div className="relative container mx-auto px-4 py-16 md:py-24">
                <div className="text-center max-w-4xl mx-auto">
                  <h1 className="text-5xl md:text-7xl font-serif font-bold text-dickinsonRed mb-6 leading-tight">
                    Welcome to Dickinson
                    <span className="block text-dickinsonGold">Discourse</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-[var(--text-color)] mb-8 leading-relaxed max-w-3xl mx-auto">
                    Where ideas flourish, knowledge connects, and the Dickinson community thrives. 
                    Join vibrant discussions, share research, and collaborate with fellow students and faculty.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                      to="/home"
                      className="group bg-dickinsonRed text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dickinsonGold hover:text-dickinsonRed hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
                      aria-label="Explore Discussions"
                    >
                      <span className="flex items-center gap-2">
                        <FaRocket className="group-hover:rotate-12 transition-transform duration-300" />
                        Explore Discussions
                      </span>
                    </Link>
                    <Link
                      to="/create"
                      className="group bg-white/80 backdrop-blur-sm text-dickinsonRed px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dickinsonGold hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-lg border-2 border-dickinsonRed/20"
                      aria-label="Start a Discussion"
                    >
                      <span className="flex items-center gap-2">
                        <FaLightbulb className="group-hover:scale-110 transition-transform duration-300" />
                        Start a Discussion
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white/50 backdrop-blur-sm py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="group">
                    <div className="bg-dickinsonRed/10 rounded-2xl p-6 hover:bg-dickinsonRed/20 transition-all duration-300">
                      <FaUsers className="text-4xl text-dickinsonRed mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-2xl font-bold text-dickinsonRed mb-2">Vibrant Community</h3>
                      <p className="text-[var(--text-color)]">Connect with students and faculty across all majors</p>
                    </div>
                  </div>
                  <div className="group">
                    <div className="bg-dickinsonGold/10 rounded-2xl p-6 hover:bg-dickinsonGold/20 transition-all duration-300">
                      <FaLightbulb className="text-4xl text-dickinsonGold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-2xl font-bold text-dickinsonGold mb-2">Share Ideas</h3>
                      <p className="text-[var(--text-color)]">Discuss research, projects, and academic insights</p>
                    </div>
                  </div>
                  <div className="group">
                    <div className="bg-dickinsonRed/10 rounded-2xl p-6 hover:bg-dickinsonRed/20 transition-all duration-300">
                      <FaGraduationCap className="text-4xl text-dickinsonRed mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-2xl font-bold text-dickinsonRed mb-2">Academic Excellence</h3>
                      <p className="text-[var(--text-color)]">Foster intellectual growth and collaboration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trending Discussions */}
            <div className="py-16 bg-gradient-to-b from-transparent to-dickinsonRed/5">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-serif font-bold text-dickinsonRed mb-4">
                    Trending Discussions
                  </h2>
                  <p className="text-xl text-[var(--text-color)] max-w-2xl mx-auto">
                    Discover what's capturing the attention of the Dickinson community
                  </p>
                </div>

                {trendingPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trendingPosts.map((post) => (
                      <Link
                        to={`/post/${post.id}`}
                        key={post.id}
                        className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden border border-white/20"
                        aria-label={`View trending post: ${post.title}`}
                      >
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="bg-dickinsonRed/10 text-dickinsonRed px-3 py-1 rounded-full text-sm font-semibold">
                              {post.category}
                            </span>
                            {post.pinned && (
                              <span className="bg-dickinsonGold text-dickinsonRed px-2 py-1 rounded-full text-xs font-bold">
                                PINNED
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-dickinsonRed mb-2 line-clamp-2 group-hover:text-dickinsonGold transition-colors duration-300">
                            {post.title}
                          </h3>
                          <p className="text-[var(--text-color)] text-sm line-clamp-3 mb-3">
                            {post.content}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>👁️ {post.views || 0}</span>
                            <span>👍 {post.upvotes || 0}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-white/50 rounded-xl p-8 max-w-md mx-auto">
                      <FaLightbulb className="text-4xl text-dickinsonGold mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-dickinsonRed mb-2">Be the First!</h3>
                      <p className="text-[var(--text-color)] mb-4">
                        Start the first trending discussion in your community
                      </p>
                      <Link
                        to="/create"
                        className="inline-block bg-dickinsonRed text-white px-6 py-3 rounded-xl font-semibold hover:bg-dickinsonGold hover:text-dickinsonRed hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        Create Post
                      </Link>
                    </div>
                  </div>
                )}

                <div className="text-center mt-12">
                  <Link
                    to="/home"
                    className="inline-block bg-dickinsonRed text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-dickinsonGold hover:text-dickinsonRed hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    View All Discussions
                  </Link>
                </div>
              </div>
            </div>
          </Route>
          <Route path="/home">
            <div className="container mx-auto px-4 py-8">
              {/* Header with Search and Filter */}
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                  <div className="flex-1 max-w-md">
                    <input
                      type="text"
                      placeholder="Search posts or tags..."
                      className="w-full p-3 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-dickinsonRed hover:border-dickinsonGold transition-all duration-300 shadow-sm bg-white/80 backdrop-blur-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label="Search posts or tags"
                    />
                  </div>
                  <div className="w-full lg:w-auto">
                    <MajorsFilter 
                      selectedCategory={selectedCategory} 
                      onCategoryChange={setSelectedCategory} 
                    />
                  </div>
                </div>
              </div>
              
              {/* Posts Content */}
              <Home searchQuery={searchQuery} selectedCategory={selectedCategory} />
            </div>
          </Route>
          <Route path="/post/:id" component={Post} />
          <Route path="/create" component={CreatePost} />
          <Route path="/about" component={About} />
          <Route path="/settings" component={Settings} />
        </Switch>

        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-4 right-4 bg-dickinsonRed text-white p-3 rounded-xl shadow-lg hover:bg-dickinsonGold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            aria-label="Back to Top"
          >
            <FaArrowUp />
          </button>
        )}
      </div>
    </Router>
  );
};

export default App;