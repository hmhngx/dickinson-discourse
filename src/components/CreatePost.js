import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { ClipLoader } from 'react-spinners';
import { 
  FaEdit, 
  FaImage, 
  FaYoutube, 
  FaTag, 
  FaGraduationCap, 
  FaCloudUploadAlt,
  FaTimes,
  FaEye,
  FaBold,
  FaItalic,
  FaListUl,
  FaListOl,
  FaLink,
  FaRocket
} from 'react-icons/fa';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Africana Studies');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageAlt, setImageAlt] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const history = useHistory();
  const isMounted = useRef(true);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const categories = [
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

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    setImageAlt('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isMounted.current) return;

    setLoading(true);
    setError(null);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('User not authenticated. Please try again.');

      let imageUrl = null;
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('post-images')
          .upload(fileName, image);
        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('post-images')
          .getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
        console.log('Generated image URL:', imageUrl); 
      }

      const tagArray = tags.split(',').map((tag) => tag.trim()).filter((tag) => tag);

      const { error: insertError } = await supabase.from('posts').insert([
        {
          user_id: user.id,
          title,
          content,
          category,
          tags: tagArray,
          image_url: imageUrl,
          image_alt: imageAlt,
          youtube_url: youtubeUrl,
          secret_key: uuidv4(),
        },
      ]);

      if (insertError) throw insertError;

      if (isMounted.current) {
        history.push('/home');
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err.message || 'Failed to create post. Please try again.');
        console.error('Error creating post:', err);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return title.trim() && category;
      case 2:
        return content.trim();
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (canProceed()) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dickinsonRed/5 via-transparent to-dickinsonGold/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-dickinsonRed mb-4">
              Create a New Post
            </h1>
            <p className="text-lg text-[var(--text-color)]">
              Share your thoughts, research, or questions with the Dickinson community
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    currentStep >= step 
                      ? 'bg-dickinsonRed text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      currentStep > step ? 'bg-dickinsonRed' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6 shadow-sm" role="alert">
              Error: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-dickinsonRed/10 p-3 rounded-xl">
                    <FaEdit className="text-2xl text-dickinsonRed" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-dickinsonRed">
                    Basic Information
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-[var(--text-color)] font-semibold mb-2">
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dickinsonRed focus:border-transparent transition-all duration-300 text-lg"
                      placeholder="Enter your post title..."
                      required
                      aria-required="true"
                    />
                    <p className="text-sm text-gray-600 mt-2">What's your post about?</p>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-[var(--text-color)] font-semibold mb-2">
                      Major
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dickinsonRed focus:border-transparent transition-all duration-300 text-lg"
                      aria-label="Select major"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <p className="text-sm text-gray-600 mt-2">Which major does this post relate to?</p>
                  </div>

                  <div>
                    <label htmlFor="tags" className="block text-[var(--text-color)] font-semibold mb-2">
                      Tags
                    </label>
                    <input
                      id="tags"
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dickinsonRed focus:border-transparent transition-all duration-300"
                      placeholder="e.g., COMP256, AI, research, capstone"
                    />
                    <p className="text-sm text-gray-600 mt-2">Add relevant tags separated by commas</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Content */}
            {currentStep === 2 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-dickinsonGold/10 p-3 rounded-xl">
                    <FaEdit className="text-2xl text-dickinsonGold" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-dickinsonGold">
                    Content
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Rich Text Editor Toolbar */}
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button type="button" className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
                        <FaBold className="text-gray-600" />
                      </button>
                      <button type="button" className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
                        <FaItalic className="text-gray-600" />
                      </button>
                      <button type="button" className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
                        <FaListUl className="text-gray-600" />
                      </button>
                      <button type="button" className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
                        <FaListOl className="text-gray-600" />
                      </button>
                      <button type="button" className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
                        <FaLink className="text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="content" className="block text-[var(--text-color)] font-semibold mb-2">
                      Content
                    </label>
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dickinsonGold focus:border-transparent transition-all duration-300 resize-none"
                      rows="12"
                      placeholder="Share your thoughts, research findings, or questions..."
                      required
                      aria-required="true"
                    />
                    <p className="text-sm text-gray-600 mt-2">Express your ideas clearly and engage your audience</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Media & Final Details */}
            {currentStep === 3 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-dickinsonRed/10 p-3 rounded-xl">
                    <FaImage className="text-2xl text-dickinsonRed" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-dickinsonRed">
                    Media & Final Details
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-[var(--text-color)] font-semibold mb-2">
                      Image (Optional)
                    </label>
                    <div
                      ref={dropZoneRef}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                        isDragOver 
                          ? 'border-dickinsonRed bg-dickinsonRed/5' 
                          : 'border-gray-300 hover:border-dickinsonGold hover:bg-gray-50/50'
                      }`}
                    >
                      {imagePreview ? (
                        <div className="relative">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="max-w-full h-48 object-cover rounded-lg mx-auto"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage();
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <FaCloudUploadAlt className="text-4xl text-gray-400 mx-auto mb-4" />
                          <p className="text-lg font-medium text-gray-600 mb-2">
                            Drop an image here or click to browse
                          </p>
                          <p className="text-sm text-gray-500">
                            Supports JPG, PNG, GIF up to 5MB
                          </p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                      className="hidden"
                    />
                  </div>

                  {image && (
                    <div>
                      <label htmlFor="imageAlt" className="block text-[var(--text-color)] font-semibold mb-2">
                        Image Description
                      </label>
                      <input
                        id="imageAlt"
                        type="text"
                        value={imageAlt}
                        onChange={(e) => setImageAlt(e.target.value)}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dickinsonRed focus:border-transparent transition-all duration-300"
                        placeholder="Describe the image for accessibility..."
                      />
                      <p className="text-sm text-gray-600 mt-2">Help make your content accessible to everyone</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="youtubeUrl" className="block text-[var(--text-color)] font-semibold mb-2">
                      YouTube URL (Optional)
                    </label>
                    <input
                      id="youtubeUrl"
                      type="url"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-dickinsonRed focus:border-transparent transition-all duration-300"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                    <p className="text-sm text-gray-600 mt-2">Add a relevant video to enhance your post</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white/80 text-[var(--text-color)] hover:bg-white hover:shadow-lg'
                }`}
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    canProceed()
                      ? 'bg-dickinsonRed text-white hover:bg-dickinsonGold hover:text-dickinsonRed hover:shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </div>

      {/* Sticky Create Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 z-50">
        <div className="container mx-auto max-w-4xl flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading || !canProceed()}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2 ${
              loading || !canProceed()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-dickinsonRed text-white hover:bg-dickinsonGold hover:text-dickinsonRed hover:shadow-xl transform hover:scale-105'
            }`}
            aria-label="Create Post"
          >
            {loading ? (
              <>
                <ClipLoader color="#fff" size={20} aria-label="Submitting" />
                Creating Post...
              </>
            ) : (
              <>
                <FaRocket className="text-xl" />
                Create Post
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;