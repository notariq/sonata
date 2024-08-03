import React from 'react';
import { useAuth } from '@/contexts/authContext';
import { TbUser } from 'react-icons/tb';
import { useRouter } from 'next/navigation'; // Import useRouter from next/router

export default function Header() {
  const { isAuthenticated, user } = useAuth(); // Assuming useAuth provides user info
  const router = useRouter(); // Get router instance

  const handleClick = () => {
    if (isAuthenticated) {
      router.push('/profile'); // Navigate to /profile if authenticated
    } else {
      router.push('/auth/login'); // Navigate to /auth/login if not authenticated
    }
  };

  return (
    <div className='py-3 flex justify-end'>
      <button
        onClick={handleClick}
        className={`px-4 py-2 rounded-full font-bold text-white ${isAuthenticated ? 'bg-black' : 'bg-gray-600'} flex items-center`}
      >
        <TbUser className='mr-2' />
        {isAuthenticated ? user.username : 'Login'}
      </button>
    </div>
  );
}
