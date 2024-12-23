import  { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const TrendingPage = () => {
  const [trendingStories, setTrendingStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch trending stories from the backend
    axios
      .get("https://storybook-backend-z7js.onrender.com/api/stories/trending")
      .then((response) => {
        setTrendingStories(response.data.trendingStories);
        setLoading(false);
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || "Error fetching trending stories");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading trending stories...</div>;
  }

  return (
    <>
    <Navbar/>
    <div className="container mx-auto my-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Top Trending Stories(5)</h1>
      {message && <div className="mb-4 text-red-500">{message}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingStories.map((story) => (
          <div key={story._id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">Title: {story.title}</h2>
            <p className="text-gray-700 mt-2 font-semibold">Content: {story.content}</p>
            <p className="mt-2 text-black font-bold"><b>Author</b>: {story.author.name}</p>
            <p className="mt-2 text-gray-600">❤️: {story.likes}</p>
            
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default TrendingPage;