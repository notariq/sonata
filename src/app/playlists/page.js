'use client'

import { useState, useEffect } from 'react';
import PlaylistCard from "@/components/playlistCard/page";
import CreatePlaylistModal from "@/components/createPlaylistModal/page";

const Playlists = ({user = "notariq"}) => {
  const [playlists, setPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('http://localhost:8080/playlist');
        const data = await response.json();
        const filteredData = data.filter(playlist => playlist.createdBy === user);
        setPlaylists(filteredData);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreatePlaylist = async (newPlaylist) => {
    try {
      const response = await fetch('http://localhost:8080/playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlaylist),
      });

      if (!response.ok) {
        throw new Error('Failed to create playlist');
      }

      const createdPlaylist = await response.json();
      setPlaylists((prevPlaylists) => [...prevPlaylists, createdPlaylist]);
      handleCloseModal();
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const handleDeletePlaylist = async (id) => {
    try {
      await fetch(`http://localhost:8080/playlist/${id}`, {
        method: 'DELETE',
      });
      setPlaylists((prevPlaylists) => prevPlaylists.filter(playlist => playlist._id !== id));
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">{user}'s Playlists</h1>
      <button onClick={handleOpenModal} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        + New Playlist
      </button>
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
