'use client'

import React from 'react';
import { useAuth } from '@/contexts/authContext';
import Link from 'next/link';

export default function User() {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="p-6 rounded-lg shadow-xl w-full flex items-center bg-gray-800 gap-6">
      <p className="text-lg text-gray-300">
          You need to 
          <Link href={'/auth/login'} className='font-bold bg-gray-200 py-1 px-2 rounded-full m-2 text-black hover:bg-gray-500 hover:text-gray-800'> Log In </Link> 
          first...</p>
      </div>
    );
  };

  return (
    <div className="p-6 rounded-lg shadow-xl w-full flex items-center bg-gray-800 gap-6">

      <div className='w-full'>
        <div className="mb-4">
          <label className="block text-gray-400 font-medium mb-1">Username</label>
          <p className="text-lg text-gray-300 bg-gray-700 p-2 rounded">{user?.username || 'N/A'}</p>
        </div>
        <div className='mb-4'>
          <label className="block text-gray-400 font-medium mb-1">Email</label>
          <p className="text-lg text-gray-300 bg-gray-700 p-2 rounded">{user?.email || 'N/A'}</p>
        </div>
    
        <div className=''>
          <button 
            className="bg-red-600 text-white py-2 px-4 rounded shadow hover:bg-red-700"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
