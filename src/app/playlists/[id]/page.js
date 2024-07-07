'use client'
import MusicCard from "@/components/music-card/page";
import React, { useState, useEffect } from "react";

const Playlists = ({ params }) => {
  const [playlist, setPlaylist] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [showAddMusicModal, setShowAddMusicModal] = useState(false);
  const [availableSongs, setAvailableSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(`http://localhost:8080/playlist/${params.id}`);
        const data = await response.json();
        setPlaylist(data);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };

    const fetchAvailableSongs = async () => {
      try {
        const response = await fetch(`http://localhost:8080/song`);
        const data = await response.json();
        setAvailableSongs(data);
      } catch (error) {
        console.error('Error fetching available songs:', error);
      }
    };

    fetchPlaylist();
    fetchAvailableSongs();
  }, [params.id]);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  const handleAddMusic = () => {
    if (selectedSong) {
      // Add selectedSong to the playlist.songs array
      const updatedSongs = [...playlist.songs, selectedSong];
      setPlaylist({ ...playlist, songs: updatedSongs });
      setSelectedSong(null); // Reset selected song
      setShowAddMusicModal(false); // Close modal after adding music
    }
  };

  if (!playlist || !availableSongs) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container w-screen">
      <h1 className="text-2xl font-bold mb-4">Playlist {playlist.playlistName}</h1>

      {/* Button to toggle modal */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowAddMusicModal(true)}
      >
        Add Music
      </button>

      {/* Modal for adding music */}
      {showAddMusicModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Add New Music</h2>
            <select
              value={selectedSong ? selectedSong._id : ''}
              onChange={(e) => {
                const selected = availableSongs.find(song => song._id === e.target.value);
                setSelectedSong(selected);
              }}
              className="border p-2 mb-2 w-full text black"
            >
              <option value="" className="text-black">Select a Song</option>
              {availableSongs.map(song => (
                <option className="text-black" key={song._id} value={song._id}>{song.title} - {song.artist}</option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded mr-2"
                onClick={handleAddMusic}
              >
                Add
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                onClick={() => setShowAddMusicModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4 mt-4">
        <MusicCard songs={playlist.songs} favorites={favorites} toggleFavorite={toggleFavorite} />
      </div>
    </div>
  );
};

export default Playlists;
