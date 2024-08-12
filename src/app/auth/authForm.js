'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/authContext';

const AuthForm = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else if (mode === 'register') {
        await register(username, email, password);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div className="w-full max-w-xs">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-black text-3xl font-bold mb-6 text-center">{mode === 'login' ? 'LOGIN' : 'REGISTER'}</h1>
          {mode === 'register' && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className='text-blue-600 pb-4 text-sm'>
            {mode === 'register'? 
              <Link href={'/auth/login'}>Already Have Account?</Link> : 
              <Link href={'/auth/register'}>Create an Account?</Link>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-black via-gray-600 via-gray-500 via-gray-600 to-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full hover:bg-gray-500"
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Register'}
          </button>
          {error && (
            <p className="text-red-500 text-xs italic mt-4">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
