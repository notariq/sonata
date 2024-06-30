'use client'

import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const songs = [
  {
    id: 1,
    picture: "https://via.placeholder.com/64",
    artist: "Artist 1",
    title: "Song 1",
    duration: "3:45",
  },
  {
    id: 2,
    picture: "https://via.placeholder.com/64",
    artist: "Artist 2",
    title: "Song 2",
    duration: "4:30",
  },
  // Add more songs as needed
];

const Playlists = ( {params} ) => {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  return (
    <div className="container mx-auto w-screen">
      <h1 className="text-2xl font-bold mb-4">Playlist {params.slug}</h1>
      <div className="space-y-4">
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex items-center p-4 bg-white shadow-md rounded-lg"
          >
            <img src={song.picture} alt={song.title} className="w-16 h-16 rounded-md" />
            <div className="ml-4 flex-1">
              <div className="text-sm text-gray-500">{song.artist}</div>
              <div className="text-lg font-medium">{song.title}</div>
            </div>
            <div className="text-gray-500">{song.duration}</div>
            <button
              onClick={() => toggleFavorite(song.id)}
              className="ml-4 focus:outline-none"
            >
              {favorites[song.id] ? (
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

export default Playlists;