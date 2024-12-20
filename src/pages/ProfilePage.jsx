import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        setError('Error fetching profile. Please try again later.');
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-semibold text-center mb-8">Your Profile Details</h1>

        {/* Profile Details */}
        {profile ? (
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-gray-500">{profile.name.charAt(0)}</span>
              </div>
              <h2 className="text-2xl font-semibold text-black">{profile.name}</h2>
              <p className="text-lg text-black mt-2"><b>User Email:</b> {profile.email}</p>
              <p className="text-lg text-black"><b>User Role:</b> {profile.role}</p>
              <p className="text-lg text-black"><b>Status:</b> {profile.verified ? 'Verified' : 'Not Verified'}</p>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">Loading...</div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;