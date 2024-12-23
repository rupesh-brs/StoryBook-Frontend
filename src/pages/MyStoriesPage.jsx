import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";

const MyStoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("https://storybook-backend-z7js.onrender.com/api/stories/mine", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setStories(response.data.stories);
      } catch (err) {
        setError("Error fetching stories. Please try again later.");
      }
    };

    fetchStories();
  }, []);

  const handleEdit = (storyId) => {
    navigate(`/edit-story/${storyId}`);
  };

  const handleDelete = async (storyId) => {
    try {
      await axios.delete(`https://storybook-backend-z7js.onrender.com/api/stories/delete/${storyId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStories(stories.filter((story) => story._id !== storyId));
    } catch (err) {
      setError("Error deleting story. Please try again later.");
    }
  };

  const handlePublish = async (storyId) => {
    try {
      await axios.post(`https://storybook-backend-z7js.onrender.com/api/stories/publish/${storyId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStories(stories.map((story) => (story._id === storyId ? { ...story, published: true } : story)));
    } catch (err) {
      setError("Error publishing story. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-semibold text-center mb-8">My Stories</h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="max-w-4xl mx-auto">
          {stories.length > 0 ? (
            stories.map((story) => (
              <div key={story._id} className="bg-white shadow-lg rounded-lg p-6 mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">{story.title}</h2>
                <p className="text-gray-600">{story.content}</p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => handleEdit(story._id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(story._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  {!story.published && (
                    <button
                      onClick={() => handlePublish(story._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      <FontAwesomeIcon icon={faUpload} />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No stories found.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyStoriesPage;