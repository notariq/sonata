'use client'

import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import MusicCard from '@/components/musicCard/musicCard';
import fetchSongs from './api';

const Search = () => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const getSongs = async () => {
      if (query.trim() === '') {
        setSongs([]);
        return;
      }

      const data = await fetchSongs(query);
      setSongs(data);
    };

    getSongs();
  }, [query]);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="relative w-full mb-4">
        <span className="absolute top-3.5 left-3 flex items-center">
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
      {query === '' && <p className='text-gray-300 text-center py-6'>Search Music...</p>}
      <div className="space-y-4">
        {songs.length > 0 && songs.map((song) => (
          <MusicCard
            key={song.id}
            title={song.title}
            artist={song.artist}
            duration={song.duration}
            coverPath={song.coverPath}
            id={song.id}
            musicList={[]}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
