'use client'

import { useState, useEffect } from 'react';
import PlaylistCard from "@/components/playlistCard/playlistCard";
import axios from 'axios';
import CreatePlaylistModal from "./createPlaylistModal";
import { useAuth } from '@/contexts/authContext';

const Playlists = () => {
  const { isAuthenticated, user } = useAuth();

  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchPlaylists = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/playlist', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          setPlaylists(response.data); // Access response.data directly
        } catch (error) {
          console.error('Error fetching playlists:', error);
          setError('Failed to fetch playlists'); // Set an error message for feedback
        }
      };

      fetchPlaylists();
    }
  }, [isAuthenticated]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreatePlaylist = async (newPlaylist) => {
    try {
      const response = await axios.post('http://localhost:5000/api/playlist', newPlaylist, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const createdPlaylist = response.data;
      setPlaylists((prevPlaylists) => [...prevPlaylists, createdPlaylist]);
      handleCloseModal();
    } catch (error) {
      console.error('Error creating playlist:', error);
      setError('Failed to create playlist'); // Set an error message for feedback
    }
  };

  const handleDeletePlaylist = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/playlist/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPlaylists((prevPlaylists) => prevPlaylists.filter(playlist => playlist._id !== id));
    } catch (error) {
      console.error('Error deleting playlist:', error);
      setError('Failed to delete playlist'); // Set an error message for feedback
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6 rounded-lg shadow-xl w-full flex items-center bg-gray-800 gap-6">
        <p className="text-lg text-gray-300">You need to login first...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{user.username} Playlists</h1>
      <button onClick={handleOpenModal} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        + New Playlist
      </button>
      {error && <p className="text-red-500">{error}</p>} {/* Display error messages */}
      <div className="flex flex-wrap gap-4 -mx-4">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} onDelete={handleDeletePlaylist} />
        ))}
      </div>
      {showModal && <CreatePlaylistModal onClose={handleCloseModal} onCreate={handleCreatePlaylist} user={user}/>}
    </div>
  );
};

export default Playlists;
