import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

const MajorsFilter = ({ selectedCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Group majors into categories for better organization
  const majorCategories = {
    'Arts & Humanities': [
      'Art & Art History',
      'Classical Studies',
      'Creative Writing',
      'Dance',
      'English',
      'Film & Media Studies',
      'French & Francophone Studies',
      'German',
      'Greek',
      'Hebrew',
      'History',
      'Humanities',
      'Italian & Italian Studies',
      'Japanese',
      'Journalism',
      'Latin',
      'Latin American, Latinx & Caribbean Studies',
      'Medieval & Early Modern Studies',
      'Music',
      'Philosophy',
      'Portuguese & Brazilian Studies',
      'Religion',
      'Russian',
      'Spanish',
      'Theatre',
      'Writing Program'
    ],
    'Social Sciences': [
      'Africana Studies',
      'American Studies',
      'Anthropology',
      'Archaeology',
      'Economics',
      'Educational Studies',
      'Environmental Studies',
      'Ethics',
      'Food Studies',
      'Health Studies',
      'International Studies',
      'Law & Policy',
      'Middle East Studies',
      'Political Science',
      'Psychology',
      'Quantitative Economics',
      'Security Studies',
      'Sociology',
      'Sustainability',
      'Womens, Gender & Sexuality Studies'
    ],
    'Sciences & Technology': [
      'Astronomy',
      'Biochemistry & Molecular Biology',
      'Biology',
      'Chemistry',
      'Computer Science',
      'Data Analytics',
      'Engineering',
      'Geosciences',
      'Mathematics',
      'Neuroscience',
      'Physics',
      'Science, Technology & Culture'
    ],
    'Business & Professional': [
      'Business',
      'International Business & Management',
      'Military Science & ROTC'
    ],
    'Interdisciplinary': [
      'Arabic',
      'Chinese',
      'East Asian Studies',
      'Interdisciplinary Studies',
      'Judaic Studies',
      'Sexuality Studies',
      'Self-Developed'
    ]
  };

  // Filter categories and majors based on search term
  const filteredCategories = Object.entries(majorCategories).reduce((acc, [category, majors]) => {
    const filteredMajors = majors.filter(major =>
      major.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredMajors.length > 0) {
      acc[category] = filteredMajors;
    }
    return acc;
  }, {});

  const handleCategorySelect = (category) => {
    onCategoryChange(category);
    setIsOpen(false);
    setSearchTerm('');
  };

  const getDisplayName = (category) => {
    if (category === 'All') return 'All Majors';
    return category;
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-serif font-bold text-dickinsonRed mb-4">Majors</h2>
      
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-left flex items-center justify-between hover:bg-white/90 transition-all duration-300 shadow-sm"
        aria-label="Select major category"
      >
        <span className="font-medium text-[var(--text-color)]">
          {getDisplayName(selectedCategory)}
        </span>
        {isOpen ? (
          <FaChevronUp className="text-dickinsonRed transition-transform duration-300" />
        ) : (
          <FaChevronDown className="text-dickinsonRed transition-transform duration-300" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 z-50 max-h-96 overflow-hidden">
          {/* Search Input */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search majors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonRed focus:border-transparent"
              />
            </div>
          </div>

          {/* All Majors Option */}
          <div className="p-2">
            <button
              onClick={() => handleCategorySelect('All')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                selectedCategory === 'All'
                  ? 'bg-dickinsonRed text-white'
                  : 'hover:bg-dickinsonGold/20 text-[var(--text-color)]'
              }`}
            >
              <span className="font-semibold">All Majors</span>
            </button>
          </div>

          {/* Category Groups */}
          <div className="max-h-80 overflow-y-auto">
            {Object.entries(filteredCategories).map(([category, majors]) => (
              <div key={category} className="border-t border-gray-100">
                <div className="px-3 py-2 bg-gray-50/50">
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    {category}
                  </h3>
                </div>
                {majors.map((major) => (
                  <button
                    key={major}
                    onClick={() => handleCategorySelect(major)}
                    className={`w-full text-left px-6 py-2 hover:bg-dickinsonGold/10 transition-all duration-200 ${
                      selectedCategory === major
                        ? 'bg-dickinsonRed text-white'
                        : 'text-[var(--text-color)]'
                    }`}
                  >
                    {major}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* No Results */}
          {Object.keys(filteredCategories).length === 0 && searchTerm && (
            <div className="p-4 text-center text-gray-500">
              No majors found matching "{searchTerm}"
            </div>
          )}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default MajorsFilter;
