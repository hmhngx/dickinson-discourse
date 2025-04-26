import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-serif font-bold text-dickinsonRed mb-6">Settings</h1>
      <div className="bg-[var(--card-bg)] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-serif font-bold text-dickinsonRed mb-4">Theme</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => toggleTheme('light')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              theme === 'light'
                ? 'bg-dickinsonRed text-white'
                : 'bg-[var(--border-color)] text-[var(--text-color)] hover:bg-dickinsonGold hover:text-dickinsonRed hover:shadow-lg transform hover:scale-103'
            }`}
            aria-label="Switch to light mode"
          >
            Light Mode
          </button>
          <button
            onClick={() => toggleTheme('dark')}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-dickinsonRed text-white'
                : 'bg-[var(--border-color)] text-[var(--text-color)] hover:bg-dickinsonGold hover:text-dickinsonRed hover:shadow-lg transform hover:scale-103'
            }`}
            aria-label="Switch to dark mode"
          >
            Dark Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;