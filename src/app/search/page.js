'use client'

// components/Search.js
import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const Search = () => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:8080/song');
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  const filteredSongs = songs.filter(song =>
    song.songTitle.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.toLowerCase().includes(query.toLowerCase())
  );

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  return (
    <div className="container mx-auto p-8 w-screen">
      <h1 className="text-2xl font-bold mb-4">Search Music</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        placeholder="Search by title or artist"
      />
      <div className="space-y-4">
        {filteredSongs.map((song) => (
          <div
            key={song._id}
            className="flex items-center p-4 bg-white shadow-md rounded-lg"
          >
            <div className="ml-4 flex-1">
              <div className="text-sm text-gray-500">{song.artist}</div>
              <div className="text-lg font-medium">{song.songTitle}</div>
            </div>
            <div className="text-gray-500">{Math.floor(song.songDuration / 60)}:{('0' + (song.songDuration % 60)).slice(-2)}</div>
            <button
              onClick={() => toggleFavorite(song._id)}
              className="ml-4 focus:outline-none"
            >
              {favorites[song._id] ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-500" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;