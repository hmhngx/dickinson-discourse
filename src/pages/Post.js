import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import YouTube from 'react-youtube';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const Post = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);
  const [upvotes, setUpvotes] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editYoutubeUrl, setEditYoutubeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        console.log('Current user:', user);
        if (authError) throw authError;
        setCurrentUser(user);

        const { data: postData, error: postError } = await supabase


          .from('posts')
          .select('*')
          .eq('id', id)
          .single();
        if (postError) throw postError;
        console.log('Post data:', postData);
        setPost(postData);
        setUpvotes(postData.upvotes || 0);
        setEditTitle(postData.title);
        setEditContent(postData.content);
        setEditImageUrl(postData.image_url || '');
        setEditYoutubeUrl(postData.youtube_url || '');

        await supabase
          .from('posts')
          .update({ views: (postData.views || 0) + 1 })
          .eq('id', id);

        const { data: commentsData, error: commentsError } = await supabase
          .from('comments')
          .select('*')
          .eq('post_id', id)
          .order('created_at', { ascending: true });
        if (commentsError) throw commentsError;
        setComments(commentsData || []);
      } catch (err) {
        setError('Failed to load post or comments. Please try again.');
        console.error('Error fetching data:', err);
      }
    };
    fetchPostAndComments();
  }, [id]);

  const handleUpvote = async () => {
    try {
      const newUpvotes = upvotes + 1;
      const { error } = await supabase
        .from('posts')
        .update({ upvotes: newUpvotes })
        .eq('id', id);
      if (error) throw error;
      setUpvotes(newUpvotes);
    } catch (err) {
      setError('Failed to upvote. Please try again.');
      console.error('Error upvoting:', err);
    }
  };

  const handleDownvote = async () => {
    try {
      const newUpvotes = upvotes - 1;
      const { error } = await supabase
        .from('posts')
        .update({ upvotes: newUpvotes })
        .eq('id', id);
      if (error) throw error;
      setUpvotes(newUpvotes);
    } catch (err) {
      setError('Failed to downvote. Please try again.');
      console.error('Error downvoting:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('User not authenticated.');

      const { error: insertError } = await supabase
        .from('comments')
        .insert([
          {
            post_id: id,
            user_id: user.id,
            content: newComment,
            is_faculty: false,
          },
        ]);
      if (insertError) throw insertError;

      const { data: updatedComments, error: commentsError } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: true });
      if (commentsError) throw commentsError;
      setComments(updatedComments || []);
      setNewComment('');
    } catch (err) {
      setError('Failed to add comment. Please try again.');
      console.error('Error adding comment:', err);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updates = {
        title: editTitle,
        content: editContent,
        image_url: editImageUrl || null,
        youtube_url: editYoutubeUrl || null,
        updated_at: new Date().toISOString(),
      };

      const { error: updateError } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', id)
        .eq('user_id', currentUser.id);
      if (updateError) throw updateError;

      setPost({ ...post, ...updates });
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update post. Please try again.');
      console.error('Error updating post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
        .eq('user_id', currentUser.id);
      if (deleteError) throw deleteError;

      history.push('/home');
    } catch (err) {
      setError('Failed to delete post. Please try again.');
      console.error('Error deleting post:', err);
      setLoading(false);
    }
  };

  if (!post) return <div>Loading...</div>;

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-[var(--card-bg)] rounded-lg shadow-md p-6 mb-6">
        {currentUser && post.user_id === currentUser.id && (
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-dickinsonRed hover:text-dickinsonGold transition-colors duration-300"
              aria-label={isEditing ? 'Cancel editing' : 'Edit post'}
            >
              {isEditing ? 'Cancel' : 'Edit Post'}
            </button>
          </div>
        )}
        {isEditing ? (
          <form onSubmit={handleUpdatePost} className="space-y-4">
            {error && (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg" role="alert">
                Error: {error}
              </div>
            )}
            <div>
              <label htmlFor="editTitle" className="block text-[var(--text-color)] font-semibold mb-1">
                Title
              </label>
              <input
                id="editTitle"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonRed hover:border-dickinsonGold transition-all duration-300"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="editContent" className="block text-[var(--text-color)] font-semibold mb-1">
                Content
              </label>
              <textarea
                id="editContent"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonRed hover:border-dickinsonGold transition-all duration-300"
                rows="5"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="editImageUrl" className="block text-[var(--text-color)] font-semibold mb-1">
                Image URL (Optional)
              </label>
              <input
                id="editImageUrl"
                type="url"
                value={editImageUrl}
                onChange={(e) => setEditImageUrl(e.target.value)}
                className="w-full p-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonRed hover:border-dickinsonGold transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="editYoutubeUrl" className="block text-[var(--text-color)] font-semibold mb-1">
                YouTube URL (Optional)
              </label>
              <input
                id="editYoutubeUrl"
                type="url"
                value={editYoutubeUrl}
                onChange={(e) => setEditYoutubeUrl(e.target.value)}
                className="w-full p-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonRed hover:border-dickinsonGold transition-all duration-300"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#00C4B4] text-white px-4 py-2 rounded-lg hover:bg-dickinsonGold hover:text-dickinsonRed hover:shadow-lg transform hover:scale-103 transition-all duration-300 flex items-center justify-center"
                aria-label="Update Post"
              >
                {loading ? <ClipLoader color="#fff" size={20} aria-label="Submitting" /> : 'Update Post'}
              </button>
              <button
                type="button"
                onClick={handleDeletePost}
                disabled={loading}
                className="bg-[#00C4B4] text-white px-4 py-2 rounded-lg hover:bg-red-700 hover:shadow-lg transform hover:scale-103 transition-all duration-300 flex items-center justify-center"
                aria-label="Delete Post"
              >
                {loading ? <ClipLoader color="#fff" size={20} aria-label="Deleting" /> : 'Delete Post'}
              </button>
            </div>
          </form>
        ) : (
          <>
            <h1 className="text-3xl font-serif font-bold text-dickinsonRed mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-2">Posted on: {new Date(post.created_at).toLocaleString()}</p>
            <p className="text-[var(--text-color)] mb-4">{post.content}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.image_alt || 'Post image'}
                className="w-full h-auto rounded-lg mb-4"
                onError={() => console.error('Failed to load image:', post.image_url)}
              />
            )}
            {post.youtube_url && (
              <div className="mb-4">
                <YouTube videoId={getYouTubeId(post.youtube_url)} opts={{ width: '100%' }} />
              </div>
            )}
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={handleUpvote}
                className="flex items-center text-dickinsonRed hover:text-dickinsonGold transition-colors duration-300"
                aria-label="Upvote post"
              >
                <FaArrowUp className="mr-1" /> {upvotes}
              </button>
              <button
                onClick={handleDownvote}
                className="flex items-center text-dickinsonRed hover:text-dickinsonGold transition-colors duration-300"
                aria-label="Downvote post"
              >
                <FaArrowDown className="mr-1" />
              </button>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-dickinsonGold text-dickinsonRed px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="bg-[var(--card-bg)] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-serif font-bold text-dickinsonRed mb-4">Comments</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4" role="alert">
            Error: {error}
          </div>
        )}
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border border-[var(--border-color)] rounded-lg focus:outline-none focus:ring-2 focus:ring-dickinsonRed hover:border-dickinsonGold transition-all duration-300"
            rows="3"
            placeholder="Add a comment..."
            aria-label="Add a comment"
          />
          <button
            type="submit"
            className="mt-2 bg-dickinsonRed text-white px-4 py-2 rounded-full hover:bg-dickinsonGold hover:text-dickinsonRed hover:shadow-lg transform hover:scale-103 transition-all duration-300"
            aria-label="Submit comment"
          >
            Submit Comment
          </button>
        </form>
        {comments.length === 0 ? (
          <p className="text-[var(--text-color)]">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-t border-[var(--border-color)] pt-4 mt-4">
              <p className="text-[var(--text-color)]">{comment.content}</p>
              <p className="text-gray-600 text-sm mt-1">
                Posted on: {new Date(comment.created_at).toLocaleString()}
                {comment.is_faculty && (
                  <span className="ml-2 text-dickinsonRed font-semibold">[Faculty]</span>
                )}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Post;