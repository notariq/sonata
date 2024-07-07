'use client'
import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const MusicCard = ({ songIds, favorites, toggleFavorite }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/song/batch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ songIds }),
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          setSongs(data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        setError('Error fetching songs');
        console.error('Error fetching songs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [songIds]);

  if (loading) {
    return <div>Loading songs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="space-y-4">
      {songs.map((song) => (
        <div key={song._id} className="flex items-center p-4 bg-white shadow-md rounded-lg">
          <img src={song.songPicturePath} className="h-16 w-16 object-cover rounded" alt={`${song.songTitle} cover`} />
          <div className="ml-4 flex-1">
            <div className="text-sm text-gray-500">{song.artist}</div>
            <div className="text-lg font-medium text-gray-500">{song.songTitle}</div>
          </div>
          <div className="text-sm text-gray-500">{song.songDuration}</div>
          <button onClick={() => toggleFavorite(song._id)} className="ml-4 focus:outline-none">
            {favorites[song._id] ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-500" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default MusicCard;
