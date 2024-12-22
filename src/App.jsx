// src/App.jsx

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import VerifyEmailPage from './pages/VerifyEmailPage';
import StoriesPage from './pages/StoriesPage';
import TrendingPage from './pages/TrendingPage';
import ProfilePage from './pages/ProfilePage';
import LogoutPage from './pages/LogoutPage';
import CreateStoryPage from './pages/CreateStoryPage';
import MyStoriesPage from './pages/MyStoriesPage';
import EditStoryPage from './pages/EditStoryPage';
// import PreventNavigation from './components/PreventNavigation.jsx';

function App() {
  return (
    <Router>
      {/* <PreventNavigation/> */}
      <Routes>
      <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/verifyEmail/:verify_token" element={<VerifyEmailPage />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/stories" element={<StoriesPage />}/>
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/createstory" element={<CreateStoryPage />} />
        <Route path="/my-stories" element={<MyStoriesPage />} />
        <Route path="/edit-story/:storyId" element={<EditStoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;