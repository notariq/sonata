'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import PlaylistCard from '@/components/playlistCard/playlistCard';
import CreatePlaylistModal from './createPlaylistModal';
import { useAuth } from '@/contexts/authContext';
import { fetchPlaylists, createPlaylist, deletePlaylist } from './api';

const Playlists = () => {
  const { isAuthenticated, user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPlaylists()
        .then(setPlaylists)
        .catch((error) => {
          console.error('Error fetching playlists:', error);
          setError('Failed to fetch playlists');
        });
    }
  }, [isAuthenticated]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleCreatePlaylist = async (newPlaylist) => {
    try {
      const createdPlaylist = await createPlaylist(newPlaylist);
      setPlaylists((prevPlaylists) => [...prevPlaylists, createdPlaylist]);
      handleCloseModal();
    } catch (error) {
      console.error('Error creating playlist:', error);
      setError('Failed to create playlist');
    }
  };

  const handleDeletePlaylist = async (id) => {
    try {
      await deletePlaylist(id);
      setPlaylists((prevPlaylists) => prevPlaylists.filter((playlist) => playlist._id !== id));
    } catch (error) {
      console.error('Error deleting playlist:', error);
      setError('Failed to delete playlist');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6 rounded-lg shadow-xl w-full flex items-center bg-gray-800 gap-6">
      <p className="text-lg text-gray-300">
          You need to 
          <Link href={'/auth/login'} className='font-bold bg-gray-200 py-1 px-2 rounded-full m-2 text-black hover:bg-gray-500 hover:text-gray-800'> Log In </Link> 
          first...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4 border-b border-gray-600 pb-4">{user.username} Playlists</h1>
      <button onClick={handleOpenModal} className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 text-white px-4 py-2 rounded mb-4 ">
        + New Playlist
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-4 gap-4">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} onDelete={handleDeletePlaylist} />
        ))}
      </div>
      {showModal && <CreatePlaylistModal onClose={handleCloseModal} onCreate={handleCreatePlaylist} user={user} />}
    </div>
  );
};

export default Playlists;
