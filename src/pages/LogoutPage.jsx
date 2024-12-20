import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from localStorage
    localStorage.removeItem('token');

    // Redirect to the login page after logout
    navigate('/login');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md text-center">
        <h1 className="text-2xl font-bold mb-6">Logging out...</h1>
      </div>
    </div>
  );
};

export default LogoutPage;