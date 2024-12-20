import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar';

const EditStoryPage = () => {
  const { storyId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/stories/${storyId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        setError('Error fetching story. Please try again later.');
      }
    };

    fetchStory();
  }, [storyId]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        `http://localhost:5000/api/stories/edit/${storyId}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setLoading(false);
      navigate('/my-stories');
    } catch (err) {
      setLoading(false);
      setError('Error updating story. Please try again later.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-center mb-8">Edit Story</h1>
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all"
            disabled={loading}
          >
            {loading ? 'Updating Story...' : 'Update Story'}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditStoryPage;