import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const CreateStoryPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publish, setPublish] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePublishChange = (e) => {
    setPublish(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !content) {
      setError('Title and Content are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/stories/create',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data && response.data.message === 'Story created successfully.') {
        const storyId = response.data.story._id;

        if (publish) {
          await axios.post(
            `http://localhost:5000/api/stories/publish/${storyId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
        }

        setLoading(false);
        navigate('/home');
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error creating story.');
      } else {
        setError('Error creating story.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-center mb-8">Create a New Story</h1>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Story Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter the story title"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">Story Content</label>
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              rows="3"
              placeholder="Write the story content here..."
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="publish" className="block text-gray-700 font-semibold mb-2">Publish</label>
            <input
              type="checkbox"
              id="publish"
              checked={publish}
              onChange={handlePublishChange}
              className="mr-2 leading-tight"
            />
            <span className="text-gray-700">Publish</span>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-400 text-white p-3 rounded-md  transition-all"
            disabled={loading}
          >
            {loading ? 'Creating Story...' : 'Create Story'}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateStoryPage;