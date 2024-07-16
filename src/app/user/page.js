import React from 'react';

function User({ username = "notariq", email = "notariq@mail.com" }) {
  return (
    <div className="p-6 rounded-lg shadow-xl w-full flex items-center bg-gray-800 gap-6">
      <div className="bg-gray-700 p-6 rounded text-6xl">
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
      <div className='flex'>
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
