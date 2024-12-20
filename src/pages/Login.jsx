import  { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom'; // For navigation after successful login
import * as Yup from 'yup'; // For validation

const LoginPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  // Formik hook for form management
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

        const data = await response.json();

        if (response.ok) {
          // Store the token in localStorage or sessionStorage
          localStorage.setItem('token', data.token);

          // Optionally, store user details (excluding password)
          localStorage.setItem('user', JSON.stringify(data.yourDetails));

          // Navigate to the dashboard or a protected page after successful login
          navigate('/home');
        } else {
          setMessage(data.message || 'Something went wrong');
        }
      } catch (error) {
        setMessage('Something went wrong, please try again later.');
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Login To Explore StoryBook App</h1>
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {message && (
          <div
            className={`mb-4 p-2 ${
              message.includes('Success') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-2 rounded-md  transition-colors"
          >
            Login
          </button>
        </form>

        {/* Link to Register page */}
        <div className="mt-4 text-center">
          <p className="text-sm text-red-500">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
