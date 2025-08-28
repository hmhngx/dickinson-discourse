import React, { useState, useEffect } from 'react';
import { 
  FaSun, 
  FaMoon, 
  FaUser, 
  FaBell, 
  FaCog, 
  FaShieldAlt, 
  FaPalette,
  FaEye,
  FaEyeSlash,
  FaGlobe,
  FaLanguage,
  FaVolumeUp,
  FaVolumeMute
} from 'react-icons/fa';

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    mentions: true,
    weekly: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    allowMessages: true
  });
  const [preferences, setPreferences] = useState({
    language: 'English',
    timezone: 'EST',
    autoSave: true
  });

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dickinsonRed/5 via-transparent to-dickinsonGold/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-dickinsonRed mb-4">
              Settings
            </h1>
            <p className="text-lg text-[var(--text-color)] max-w-2xl mx-auto">
              Customize your Dickinson Discourse experience and manage your preferences
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Theme Settings */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-dickinsonRed/10 p-3 rounded-xl">
                    <FaPalette className="text-2xl text-dickinsonRed" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-dickinsonRed">
                    Appearance
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {theme === 'light' ? (
                        <FaSun className="text-xl text-dickinsonGold" />
                      ) : (
                        <FaMoon className="text-xl text-gray-600" />
                      )}
                      <div>
                        <h3 className="font-semibold text-[var(--text-color)]">Dark Mode</h3>
                        <p className="text-sm text-gray-600">Switch between light and dark themes</p>
                      </div>
                    </div>
                    <button
                      onClick={toggleTheme}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dickinsonRed focus:ring-offset-2 ${
                        theme === 'dark' ? 'bg-dickinsonRed' : 'bg-gray-300'
                      }`}
                      aria-label="Toggle dark mode"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Settings */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-dickinsonGold/10 p-3 rounded-xl">
                    <FaUser className="text-2xl text-dickinsonGold" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-dickinsonGold">
                    Profile
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50/50 rounded-lg">
                    <h3 className="font-semibold text-[var(--text-color)] mb-2">Display Name</h3>
                    <input
                      type="text"
                      placeholder="Enter your display name"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonGold focus:border-transparent"
                    />
                  </div>
                  
                  <div className="p-4 bg-gray-50/50 rounded-lg">
                    <h3 className="font-semibold text-[var(--text-color)] mb-2">Bio</h3>
                    <textarea
                      placeholder="Tell us about yourself..."
                      rows="3"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonGold focus:border-transparent resize-none"
                    />
                  </div>
                  
                  <div className="p-4 bg-gray-50/50 rounded-lg">
                    <h3 className="font-semibold text-[var(--text-color)] mb-2">Major</h3>
                    <select className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonGold focus:border-transparent">
                      <option>Select your major</option>
                      <option>Computer Science</option>
                      <option>English</option>
                      <option>Biology</option>
                      <option>Economics</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Notifications */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-dickinsonRed/10 p-3 rounded-xl">
                    <FaBell className="text-2xl text-dickinsonRed" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-dickinsonRed">
                    Notifications
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-[var(--text-color)] capitalize">
                          {key === 'email' ? 'Email Notifications' : 
                           key === 'push' ? 'Push Notifications' :
                           key === 'mentions' ? 'Mentions' : 'Weekly Digest'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {key === 'email' ? 'Receive notifications via email' :
                           key === 'push' ? 'Get push notifications in browser' :
                           key === 'mentions' ? 'Notify when someone mentions you' : 'Weekly summary of activity'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleNotificationChange(key)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dickinsonRed focus:ring-offset-2 ${
                          value ? 'bg-dickinsonRed' : 'bg-gray-300'
                        }`}
                        aria-label={`Toggle ${key} notifications`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy & Security */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-dickinsonGold/10 p-3 rounded-xl">
                    <FaShieldAlt className="text-2xl text-dickinsonGold" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-dickinsonGold">
                    Privacy & Security
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50/50 rounded-lg">
                    <h3 className="font-semibold text-[var(--text-color)] mb-2">Profile Visibility</h3>
                    <select 
                      value={privacy.profileVisibility}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonGold focus:border-transparent"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[var(--text-color)]">Show Email</h3>
                      <p className="text-sm text-gray-600">Display your email on your profile</p>
                    </div>
                    <button
                      onClick={() => handlePrivacyChange('showEmail', !privacy.showEmail)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dickinsonGold focus:ring-offset-2 ${
                        privacy.showEmail ? 'bg-dickinsonGold' : 'bg-gray-300'
                      }`}
                      aria-label="Toggle email visibility"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          privacy.showEmail ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-dickinsonRed/10 p-3 rounded-xl">
                    <FaCog className="text-2xl text-dickinsonRed" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-dickinsonRed">
                    Preferences
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50/50 rounded-lg">
                    <h3 className="font-semibold text-[var(--text-color)] mb-2">Language</h3>
                    <select 
                      value={preferences.language}
                      onChange={(e) => handlePreferenceChange('language', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonRed focus:border-transparent"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>
                  
                  <div className="p-4 bg-gray-50/50 rounded-lg">
                    <h3 className="font-semibold text-[var(--text-color)] mb-2">Timezone</h3>
                    <select 
                      value={preferences.timezone}
                      onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonRed focus:border-transparent"
                    >
                      <option value="EST">Eastern Time (EST)</option>
                      <option value="CST">Central Time (CST)</option>
                      <option value="MST">Mountain Time (MST)</option>
                      <option value="PST">Pacific Time (PST)</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[var(--text-color)]">Auto-save Drafts</h3>
                      <p className="text-sm text-gray-600">Automatically save your post drafts</p>
                    </div>
                    <button
                      onClick={() => handlePreferenceChange('autoSave', !preferences.autoSave)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-dickinsonRed focus:ring-offset-2 ${
                        preferences.autoSave ? 'bg-dickinsonRed' : 'bg-gray-300'
                      }`}
                      aria-label="Toggle auto-save"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                          preferences.autoSave ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="text-center mt-12">
            <button className="bg-dickinsonRed text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-dickinsonGold hover:text-dickinsonRed hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-lg">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;