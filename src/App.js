import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Home from './pages/Home';
import Post from './pages/Post';
import CreatePost from './components/CreatePost';
import Settings from './components/Settings';
import About from './pages/About';
import { FaArrowUp } from 'react-icons/fa';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [authError, setAuthError] = useState(null);

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

    initializeAuth();

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
        <nav className="bg-dickinsonRed text-white p-4 sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <Link
              to="/"
              className="text-3xl font-serif font-bold relative group hover:text-dickinsonGold transition-colors duration-300"
              aria-label="Dickinson Discourse Home"
            >
              Dickinson Discourse
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-dickinsonGold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 mt-2 md:mt-0">
              <Link
                to="/home"
                className="relative group hover:text-dickinsonGold transition-colors duration-300"
                aria-label="Home Feed"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-dickinsonGold transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/create"
                className="relative group hover:text-dickinsonGold transition-colors duration-300"
                aria-label="Create Post"
              >
                Create Post
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-dickinsonGold transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/about"
                className="relative group hover:text-dickinsonGold transition-colors duration-300"
                aria-label="About Dickinson Discourse"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-dickinsonGold transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/settings"
                className="relative group hover:text-dickinsonGold transition-colors duration-300"
                aria-label="Settings"
              >
                Settings
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-dickinsonGold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </nav>

        {authError && (
          <div className="container mx-auto px-4 py-2 bg-red-100 text-red-700" role="alert">
            {authError}
          </div>
        )}

        <Switch>
          <Route exact path="/">
            <div className="container mx-auto px-4 py-8">
              <section className="bg-[var(--card-bg)] rounded-lg shadow-md p-8 mb-8 animate-fade-in text-center">
                <h1 className="text-4xl font-serif font-bold text-dickinsonRed mb-4">
                  Welcome to Dickinson Discourse
                </h1>
                <p className="text-lg text-[var(--text-color)] mb-6 max-w-2xl mx-auto">
                  A platform for Dickinson College students and faculty to collaborate, share research, and discuss academic and civic ideas in a vibrant, inclusive community.
                </p>
                <Link
                  to="/home"
                  className="inline-block bg-dickinsonRed text-white px-6 py-3 rounded-full hover:bg-dickinsonGold hover:text-dickinsonRed hover:shadow-lg transform hover:scale-103 transition-all duration-300"
                  aria-label="Explore Discussions"
                >
                  Explore Discussions
                </Link>
              </section>
            </div>
          </Route>
          <Route path="/home">
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row">
              <aside className="md:w-1/4 mb-6 md:mb-0 md:pr-6">
                <h2 className="text-2xl font-serif font-bold text-dickinsonRed mb-4">Majors</h2>
                <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                  <ul className="space-y-2">
                    {categories.map((cat) => (
                      <li key={cat}>
                        <button
                          onClick={() => setSelectedCategory(cat)}
                          className={`w-full text-left p-2 rounded-lg hover:bg-dickinsonGold hover:text-dickinsonRed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-dickinsonRed ${
                            selectedCategory === cat ? 'bg-dickinsonRed text-white' : ''
                          }`}
                          aria-label={`Filter by ${cat}`}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
              <div className="md:w-3/4">
                <div className="flex justify-between mb-6">
                  <input
                    type="text"
                    placeholder="Search posts or tags..."
                    className="w-full md:w-1/2 p-2 rounded-lg border border-[var(--border-color)] focus:outline-none focus:ring-2 focus:ring-dickinsonRed hover:border-dickinsonGold transition-all duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search posts or tags"
                  />
                </div>
                <Home searchQuery={searchQuery} selectedCategory={selectedCategory} />
              </div>
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
            className="fixed bottom-4 right-4 bg-dickinsonRed text-white p-3 rounded-full shadow-lg hover:bg-dickinsonGold hover:shadow-xl transform hover:scale-103 transition-all duration-300"
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