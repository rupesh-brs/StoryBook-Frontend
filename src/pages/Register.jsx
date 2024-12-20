import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  // Formik hook for form management
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'reader',
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = 'Name is required';
      }
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is invalid';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
      }
      return errors;
    },
    onSubmit: async (values) => {
      setMessage('');
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (response.ok) {
          setMessage(data.message);
          // Redirect to the verify email page after successful registration
          navigate(`/verifyEmail/${data.verify_token}`);  // Redirect to the verification page with token
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage('Something went wrong, please try again later.');
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        {message && (
          <div
            className={`mb-4 p-2 ${
              message.includes('success') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Role</label>
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="reader">Reader</option>
              <option value="author">Author</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-2 rounded-md  transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
