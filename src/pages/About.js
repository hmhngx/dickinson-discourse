import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGraduationCap, 
  FaUsers, 
  FaShieldAlt, 
  FaLightbulb, 
  FaGlobe, 
  FaHandshake,
  FaRocket,
  FaHeart
} from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dickinsonRed/5 via-transparent to-dickinsonGold/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-dickinsonRed mb-6">
            About Dickinson Discourse
          </h1>
          <p className="text-xl text-[var(--text-color)] max-w-3xl mx-auto leading-relaxed">
            A student-built platform fostering collaboration and intellectual exchange within the Dickinson College community.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-dickinsonRed/10 p-4 rounded-2xl">
                <FaGraduationCap className="text-4xl text-dickinsonRed" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-dickinsonRed">
                Our Mission
              </h2>
            </div>
            <p className="text-lg text-[var(--text-color)] leading-relaxed">
              Inspired by Dickinson's commitment to liberal arts education, global perspectives, and student-faculty partnerships, 
              Dickinson Discourse enables students and faculty to share research, discuss academic ideas, and engage in civic discourse.
            </p>
            <p className="text-[var(--text-color)] leading-relaxed">
              We believe in the power of collaborative learning and the importance of creating spaces where intellectual curiosity 
              can flourish within our vibrant academic community.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <FaGlobe className="text-8xl text-dickinsonRed/20 mx-auto mb-4" />
              <div className="text-center">
                <h3 className="text-xl font-bold text-dickinsonRed mb-2">Global Perspectives</h3>
                <p className="text-[var(--text-color)]">Connecting Dickinsonians across disciplines and borders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="flex justify-center order-2 md:order-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <FaUsers className="text-8xl text-dickinsonGold/20 mx-auto mb-4" />
              <div className="text-center">
                <h3 className="text-xl font-bold text-dickinsonGold mb-2">Community First</h3>
                <p className="text-[var(--text-color)]">40+ majors, endless possibilities</p>
              </div>
            </div>
          </div>
          <div className="space-y-6 order-1 md:order-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-dickinsonGold/10 p-4 rounded-2xl">
                <FaLightbulb className="text-4xl text-dickinsonGold" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-dickinsonGold">
                Key Features
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-dickinsonRed/10 p-2 rounded-lg mt-1">
                  <FaGraduationCap className="text-dickinsonRed text-sm" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-color)] mb-1">Department-Specific Discussions</h4>
                  <p className="text-[var(--text-color)] text-sm">Tied to Dickinson's 40+ majors for focused academic discourse</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-dickinsonGold/10 p-2 rounded-lg mt-1">
                  <FaHandshake className="text-dickinsonGold text-sm" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-color)] mb-1">Student-Faculty Collaboration</h4>
                  <p className="text-[var(--text-color)] text-sm">Support for research projects and capstone showcases</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-dickinsonRed/10 p-2 rounded-lg mt-1">
                  <FaShieldAlt className="text-dickinsonRed text-sm" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text-color)] mb-1">Secure & Accessible</h4>
                  <p className="text-[var(--text-color)] text-sm">ADA-compliant design with secure, anonymous authentication</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology & Values Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-dickinsonRed/10 p-4 rounded-2xl">
                <FaRocket className="text-4xl text-dickinsonRed" />
              </div>
              <h2 className="text-3xl font-serif font-bold text-dickinsonRed">
                Built for Innovation
              </h2>
            </div>
            <p className="text-lg text-[var(--text-color)] leading-relaxed">
              Built with React, Supabase, and Tailwind CSS, Dickinson Discourse reflects the college's values of innovation, 
              inclusion, and community.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-dickinsonRed mb-1">React</div>
                <div className="text-xs text-gray-600">Frontend</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-dickinsonGold mb-1">Supabase</div>
                <div className="text-xs text-gray-600">Backend</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-xl">
                <div className="text-2xl font-bold text-dickinsonRed mb-1">Tailwind</div>
                <div className="text-xs text-gray-600">Styling</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <FaHeart className="text-8xl text-dickinsonRed/20 mx-auto mb-4" />
              <div className="text-center">
                <h3 className="text-xl font-bold text-dickinsonRed mb-2">Community Values</h3>
                <p className="text-[var(--text-color)]">Innovation, inclusion, and collaboration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center py-16">
          <div className="bg-gradient-to-r from-dickinsonRed to-dickinsonRed/90 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl font-serif font-bold text-white mb-6">
              Ready to Join the Discussion?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Connect with fellow Dickinsonians, share your research, and be part of our vibrant academic community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/home"
                className="group bg-white text-dickinsonRed px-8 py-4 rounded-xl font-bold text-lg hover:bg-dickinsonGold hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
                aria-label="Explore Discussions"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaRocket className="group-hover:rotate-12 transition-transform duration-300" />
                  Explore Discussions
                </span>
              </Link>
              <Link
                to="/create"
                className="group bg-dickinsonGold text-dickinsonRed px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-lg"
                aria-label="Start a Discussion"
              >
                <span className="flex items-center justify-center gap-2">
                  <FaLightbulb className="group-hover:scale-110 transition-transform duration-300" />
                  Start a Discussion
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="text-center py-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <h3 className="text-2xl font-serif font-bold text-dickinsonRed mb-4">
              Help Us Improve
            </h3>
            <p className="text-[var(--text-color)] mb-6">
              We welcome feedback to enhance Dickinson Discourse's utility for the entire Dickinson community.
            </p>
            <Link
              to="/settings"
              className="inline-block bg-dickinsonRed text-white px-6 py-3 rounded-xl font-semibold hover:bg-dickinsonGold hover:text-dickinsonRed hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;