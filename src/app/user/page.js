import React from 'react';

function User({ username = "test", email = "test@mail.com" }) {
  return (
    <div className="p-6 rounded-lg shadow-xl w-full flex flex-col sm:flex-row items-center bg-gray-800 gap-6">
      <div className="bg-gray-700 p-6 rounded text-6xl flex-shrink-0">
        <p>🎸</p>
      </div>
      <div className='w-full'>
        <div className="mb-4">
          <label className="block text-gray-400 font-medium mb-1">Username</label>
          <p className="text-lg text-gray-300 bg-gray-700 p-2 rounded">{username}</p>
        </div>
        <div>
          <label className="block text-gray-400 font-medium mb-1">Email</label>
          <p className="text-lg text-gray-300 bg-gray-700 p-2 rounded">{email}</p>
        </div>
      </div>
      <div className='flex-shrink-0'>
        <button 
          className="bg-red-600 text-white py-2 px-4 rounded shadow hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default User;
