import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-serif font-bold text-dickinsonRed mb-6">About Dickinson Discourse</h1>
      <div className="bg-[var(--card-bg)] rounded-lg shadow-md p-6 space-y-4">
        <p className="text-[var(--text-color)]">
          Dickinson Discourse is a student-built platform designed to foster collaboration and intellectual exchange within the Dickinson College community. Inspired by Dickinson’s commitment to liberal arts education, global perspectives, and student-faculty partnerships, this platform enables students and faculty to share research, discuss academic ideas, and engage in civic discourse.
        </p>
        <div className="text-[var(--text-color)]">
          <p>Key features include:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Department-specific discussions tied to Dickinson’s 40+ majors.</li>
            <li>Support for student-faculty research projects and capstone showcases.</li>
            <li>Accessible design compliant with ADA standards.</li>
            <li>Secure, anonymous authentication for open yet safe participation.</li>
          </ul>
        </div>
        <p className="text-[var(--text-color)]">
          Built with React, Supabase, and Tailwind CSS, Dickinson Discourse reflects the college’s values of innovation, inclusion, and community. We welcome feedback to enhance its utility for Dickinsonians.
        </p>
        <Link
          to="/home"
          className="inline-block bg-dickinsonRed text-white px-6 py-3 rounded-full hover:bg-dickinsonGold hover:text-dickinsonRed hover:shadow-lg transform hover:scale-103 transition-all duration-300"
          aria-label="Join the Discussion"
        >
          Join the Discussion
        </Link>
      </div>
    </div>
  );
};

export default About;