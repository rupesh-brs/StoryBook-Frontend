import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const renderAuthorLinks = () => {
    return (
      <>
        <li><Link to="/home" className="text-white hover:text-black">Home</Link></li>
        <li><Link to="/createstory" className="text-white hover:text-black">Create Story</Link></li>
        <li><Link to="/my-stories" className="text-white hover:text-black">My Stories</Link></li>
        <li><Link to="/trending" className="text-white hover:text-black">Trending</Link></li>
      </>
    );
  };

  const renderReaderLinks = () => {
    return (
      <>
        <li><Link to="/home" className="text-white hover:text-black">Home</Link></li>
        <li><Link to="/trending" className="text-white hover:text-black">Trending</Link></li>
      </>
    );
  };

  const renderAuthLinks = () => {
    return (
      <>
        {user ? (
          <>
            <li><Link to="/profile" className="text-white hover:text-black ">Profile</Link></li>
            <li><Link to="/logout" className="text-white hover:text-black ">Logout</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="text-white hover:text-black">Login</Link></li>
            <li><Link to="/register" className="text-white hover:text-black">Register</Link></li>
          </>
        )}
      </>
    );
  };

  return (
    <nav className="bg-cyan-400 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-white text-2xl font-bold hover:text-black">StoryBookApp</Link>
        <ul className="flex space-x-6">
          {user ? (user.role === 'author' ? renderAuthorLinks() : renderReaderLinks()) : null}
          {renderAuthLinks()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
