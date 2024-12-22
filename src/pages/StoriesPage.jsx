import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';

const StoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState('');
  const [likes, setLikes] = useState({}); // Track likes for each story
  const [comments, setComments] = useState({}); // Track comments for each story
  const [commentText, setCommentText] = useState({}); // Track individual comment input for each story

  // Fetch stories on component mount
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stories/getstories', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log("Fetched stories:", response.data); // Log the fetched stories
        if (response.data) {
          setStories(response.data);

          // Initialize likes and comments state
          const initialLikes = {};
          const initialComments = {};
          const initialCommentText = {};
          response.data.forEach(story => {
            initialLikes[story._id] = story.likes || 0;
            initialComments[story._id] = story.comments || [];
            initialCommentText[story._id] = ''; // Initialize comment input text to empty for each story
          });
          setLikes(initialLikes);
          setComments(initialComments);
          setCommentText(initialCommentText);
        }
      } catch (err) {
        console.error("Error fetching stories:", err); // Log the error
        setError('Error fetching stories. Please try again later.');
      }
    };

    fetchStories();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleLike = async (storyId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/stories/like/${storyId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log("Liked story:", response.data);
      setLikes(prevLikes => ({
        ...prevLikes,
        [storyId]: prevLikes[storyId] + 1,
      }));
    } catch (err) {
      console.error("Error liking story:", err);
      setError('Only Single Like is allowed per user.');
    }
  };

  const handleCommentChange = (storyId, e) => {
    setCommentText({
      ...commentText,
      [storyId]: e.target.value, // Dynamically update comment for each story
    });
  };

  const handleCommentSubmit = async (storyId) => {
    if (commentText[storyId]?.trim()) {
      try {
        const response = await axios.post(`http://localhost:5000/api/stories/comment/${storyId}`, {
          comment: commentText[storyId],
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log("Commented on story:", response.data);
        
        // Update the comments state to reflect the new comment
        setComments({
          ...comments,
          [storyId]: [...comments[storyId], commentText[storyId]], // Add the new comment locally
        });

        // Clear the comment input field after submission
        setCommentText({
          ...commentText,
          [storyId]: '', // Reset the comment input for that story
        });
      } catch (err) {
        console.error("Error commenting on story:", err);
        setError('Error commenting on story. Please try again later.');
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Published Stories</h1>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stories.length > 0 ? (
          stories.map((story) => (
            <div key={story._id} className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800">{story.title}</h2>
              <p className="text-gray-600">{story.content}</p>
              
              <div className="mt-4 flex justify-between items-center">
                <button className="text-red-500" onClick={() => handleLike(story._id)}>
                  <FontAwesomeIcon icon={faThumbsUp} /> Like ({likes[story._id]})
                </button>
                <button className="text-blue-500">
                  <FontAwesomeIcon icon={faComment} /> Comment
                </button>
              </div>

              <div className="mt-4">
                <textarea
                  value={commentText[story._id] || ''}
                  onChange={(e) => handleCommentChange(story._id, e)}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows="1"
                  placeholder="Write a comment..."
                ></textarea>
                <button
                  onClick={() => handleCommentSubmit(story._id)}
                  className="bg-cyan-500 text-white px-4 py-2 rounded-md mt-2"
                >
                  Submit Comment
                </button>
              </div>
              
              {/* Render existing comments */}
              <div className="mt-4">
                {comments[story._id] && comments[story._id].length > 0 && (
                  <>
                    <h3 className="font-semibold text-lg text-gray-800">Comments:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {comments[story._id].map((comment, index) => (
                        <li key={index} className="text-gray-700">{comment}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No stories found.</div>
        )}
      </div>
    </div>
  );
};

export default StoriesPage;
