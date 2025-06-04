// Login.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type FormData = { email: string; password: string };

export const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      // Aqui tenemos que llamar al endpoint ciamndp este listo
      console.log('Login with:', data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5245/auth/google";
  };

  return (
    <div className="h-screen mx-auto flex items-center justify-center">
      <div className="w-1/2 bg-gray-100 p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              aria-invalid={!!errors.email}
              {...register('email', {
                required: 'The mail is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid mail' }
              })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <p role="alert" className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              aria-invalid={!!errors.password}
              {...register('password', {
                required: 'The password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' }
              })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.password && (
              <p role="alert" className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button for sending the form*/}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-indigo-600 cursor-pointer text-white rounded hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Entering...' : 'Enter'}
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">o</div>

        {/* Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center cursor-pointer justify-center py-2 border rounded hover:bg-white transition"
        >
          <img src="/Google_logo.png" alt="" className="w-5 h-5 mr-2" />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;