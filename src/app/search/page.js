'use client'

import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);

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

  return (
    <div className="container mx-auto w-screen">
      <div className="relative w-full mb-4">
        <span className="absolute top-3.5 left-0 flex items-center pl-3">
          <FaSearch className="text-gray-500" />
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 pl-10 mb-4 border border-gray-300 rounded-lg text-gray-500"
          placeholder="Search by title or artist"
        />
      </div>
      <div className="space-y-4">
        {filteredSongs.map((song) => (
          <div key={song._id}   className="flex items-center p-4 bg-white shadow-md rounded-lg">
            <img src={song.songPicturePath} className="h-16 w-16 object-cover rounded" alt={`${song.songTitle} cover`} />
            <div className="ml-4 flex-1">
              <div className="text-sm text-gray-500">{song.artist}</div>
              <div className="text-lg font-medium text-gray-500">{song.songTitle}</div>
            </div>
            <div className="text-sm text-gray-500">{song.songDuration}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;