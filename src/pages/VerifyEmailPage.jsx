import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

const VerifyEmailPage = () => {
  const { verify_token } = useParams();  // Extract token from the URL
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Send the token to the backend for verification
        const response = await fetch(`http://localhost:5000/api/auth/verifyEmail/${verify_token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message); // Show success message
          setLoading(false);
          // Redirect to the login page after successful verification
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setMessage(data.message); // Show error message
          setLoading(false);
        }
      } catch (error) {
        setMessage('An error occurred. Please try again later.');
        setLoading(false);
      }
    };

    verifyEmail(); // Trigger email verification on component mount
  }, [verify_token, navigate]);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6">Email Verification</h1>
        {loading ? (
          <div>Verifying...</div>
        ) : (
          <div className={`mb-4 p-2 ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default VerifyEmailPage;