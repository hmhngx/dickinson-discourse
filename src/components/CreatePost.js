import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { ClipLoader } from 'react-spinners';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Africana Studies');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [imageAlt, setImageAlt] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const isMounted = useRef(true);

  // Cleanup on unmount
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

        // Get the public URL
        const { data: publicUrlData } = supabase.storage
          .from('post-images')
          .getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
        console.log('Generated image URL:', imageUrl); // Debug log
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-serif font-bold text-dickinsonRed mb-6">Create a New Post</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4" role="alert">
          Error: {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-[var(--card-bg)] rounded-lg shadow-md p-6 space-y-4">
        <div>
          <label htmlFor="title" className="block text-[var(--text-color)] font-semibold mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonRed hover:border-dickinsonGold transition-all duration-300"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-[var(--text-color)] font-semibold mb-1">
            Major
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonRed hover:border-dickinsonGold transition-all duration-300"
            aria-label="Select major"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tags" className="block text-[var(--text-color)] font-semibold mb-1">
            Tags (comma-separated, e.g., COMP256, AI)
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonRed hover:border-dickinsonGold transition-all duration-300"
            placeholder="e.g., COMP256, AI, research"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-[var(--text-color)] font-semibold mb-1">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonRed hover:border-dickinsonGold transition-all duration-300"
            rows="5"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-[var(--text-color)] font-semibold mb-1">
            Image (Optional)
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border border-[var(--border-color)] rounded-lg hover:border-dickinsonGold transition-all duration-300"
          />
        </div>
        <div>
          <label htmlFor="imageAlt" className="block text-[var(--text-color)] font-semibold mb-1">
            Image Description (for accessibility)
          </label>
          <input
            id="imageAlt"
            type="text"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            className="w-full p-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonRed hover:border-dickinsonGold transition-all duration-300"
            placeholder="Describe the image"
          />
        </div>
        <div>
          <label htmlFor="youtubeUrl" className="block text-[var(--text-color)] font-semibold mb-1">
            YouTube URL (Optional)
          </label>
          <input
            id="youtubeUrl"
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="w-full p-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonRed hover:border-dickinsonGold transition-all duration-300"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-dickinsonRed text-white px-6 py-2 rounded-full hover:bg-dickinsonGold hover:text-dickinsonRed hover:shadow-lg transform hover:scale-103 transition-all duration-300 flex items-center justify-center"
          aria-label="Create Post"
        >
          {loading ? <ClipLoader color="#fff" size={20} aria-label="Submitting" /> : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;