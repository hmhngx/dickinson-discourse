import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaBars, 
  FaTimes, 
  FaChevronDown, 
  FaHome, 
  FaEdit, 
  FaInfoCircle, 
  FaCog, 
  FaUser,
  FaBell,
  FaSearch,
  FaSun,
  FaMoon
} from 'react-icons/fa';

const Navigation = ({ theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);
  const dropdownRefs = useRef({});

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !dropdownRefs.current[activeDropdown]?.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navigation items with icons and dropdowns
  const navItems = [
    {
      name: 'Home',
      path: '/home',
      icon: FaHome,
      dropdown: null
    },
    {
      name: 'Create',
      path: '/create',
      icon: FaEdit,
      dropdown: null
    },
    {
      name: 'About',
      path: '/about',
      icon: FaInfoCircle,
      dropdown: null
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: FaCog,
      dropdown: null
    }
  ];

  // Quick actions dropdown items
  const quickActions = [
    { name: 'Profile', icon: FaUser, path: '/settings' },
    { name: 'Notifications', icon: FaBell, path: '/settings' },
    { name: 'Search', icon: FaSearch, path: '/home' }
  ];

  return (
    <>
      {/* Modern Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'nav-scrolled backdrop-blur-md shadow-lg' 
            : 'bg-nav shadow-md'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link
              to="/"
              className={`flex items-center space-x-2 group transition-all duration-300 ${
                isScrolled ? 'text-primary' : 'text-inverse'
              }`}
              aria-label="Dickinson Discourse Home"
            >
              <div className="text-2xl font-serif font-bold group-hover:scale-105 transition-transform duration-300">
                Dickinson Discourse
              </div>
              <div className="w-0 h-0.5 bg-dickinson-gold group-hover:w-full transition-all duration-300"></div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                                     <Link
                     to={item.path}
                     className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
                       isScrolled 
                         ? 'text-primary hover:bg-overlay-dark' 
                         : 'text-inverse hover:bg-overlay-dark'
                     } ${
                       location.pathname === item.path 
                         ? 'bg-dickinson-gold/20 text-dickinson-gold' 
                         : ''
                     }`}
                     aria-label={item.name}
                   >
                    <item.icon className="text-sm" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </div>
              ))}

              {/* Quick Actions Dropdown */}
              <div className="relative" ref={(el) => dropdownRefs.current['quickActions'] = el}>
                                 <button
                   onClick={() => toggleDropdown('quickActions')}
                   className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 group ${
                     isScrolled 
                       ? 'text-primary hover:bg-overlay-dark' 
                       : 'text-inverse hover:bg-overlay-dark'
                   }`}
                   aria-label="Quick Actions"
                 >
                  <FaUser className="text-sm" />
                  <span className="font-medium">Quick</span>
                  <FaChevronDown className={`text-xs transition-transform duration-300 ${
                    activeDropdown === 'quickActions' ? 'rotate-180' : ''
                  }`} />
                </button>

                                 {/* Quick Actions Dropdown Menu */}
                 <div className={`absolute right-0 top-full mt-2 w-48 bg-card rounded-xl shadow-xl border border-primary backdrop-blur-md transition-all duration-300 transform origin-top ${
                   activeDropdown === 'quickActions' 
                     ? 'opacity-100 scale-100 translate-y-0' 
                     : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                 }`}>
                   <div className="py-2">
                     {quickActions.map((action) => (
                       <Link
                         key={action.name}
                         to={action.path}
                         className="flex items-center space-x-3 px-4 py-3 text-primary hover:bg-overlay-dark transition-colors duration-200 group"
                       >
                         <action.icon className="text-sm text-muted group-hover:text-dickinson-red transition-colors duration-200" />
                         <span className="font-medium">{action.name}</span>
                       </Link>
                     ))}
                   </div>
                 </div>
              </div>

                             {/* Theme Toggle */}
               <button
                 onClick={toggleTheme}
                 className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                   isScrolled 
                     ? 'text-primary hover:bg-overlay-dark' 
                     : 'text-inverse hover:bg-overlay-dark'
                 }`}
                 aria-label="Toggle theme"
               >
                {theme === 'dark' ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
              </button>
            </div>

                         {/* Mobile Menu Button */}
             <button
               onClick={toggleMobileMenu}
               className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                 isScrolled 
                   ? 'text-primary hover:bg-overlay-dark' 
                   : 'text-inverse hover:bg-overlay-dark'
               }`}
               aria-label="Toggle mobile menu"
             >
              {isMobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

             {/* Mobile Menu */}
       <div 
         ref={mobileMenuRef}
         className={`fixed top-16 left-0 right-0 bg-card border-b border-primary z-50 transform transition-transform duration-300 lg:hidden ${
           isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
         }`}
       >
         <div className="container mx-auto px-4 py-4">
           <div className="space-y-2">
             {navItems.map((item) => (
               <Link
                 key={item.name}
                 to={item.path}
                 className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                   location.pathname === item.path 
                     ? 'bg-dickinson-red/10 text-dickinson-red' 
                     : 'text-primary hover:bg-overlay-dark'
                 }`}
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                <item.icon className="text-lg" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

                         {/* Mobile Quick Actions */}
             <div className="border-t border-primary pt-4 mt-4">
               <h3 className="px-4 py-2 text-sm font-semibold text-muted uppercase tracking-wide">
                 Quick Actions
               </h3>
               {quickActions.map((action) => (
                 <Link
                   key={action.name}
                   to={action.path}
                   className="flex items-center space-x-3 px-4 py-3 text-primary hover:bg-overlay-dark rounded-lg transition-colors duration-200 group"
                   onClick={() => setIsMobileMenuOpen(false)}
                 >
                   <action.icon className="text-lg text-muted group-hover:text-dickinson-red transition-colors duration-200" />
                   <span className="font-medium">{action.name}</span>
                 </Link>
               ))}
             </div>

             {/* Mobile Theme Toggle */}
             <div className="border-t border-primary pt-4 mt-4">
               <button
                 onClick={() => {
                   toggleTheme();
                   setIsMobileMenuOpen(false);
                 }}
                 className="flex items-center space-x-3 px-4 py-3 text-primary hover:bg-overlay-dark rounded-lg transition-colors duration-200 w-full"
               >
                {theme === 'dark' ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
                <span className="font-medium">
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;
