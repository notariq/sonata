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
      const data = await fetchSongs();
      setSongs(data);
    };

    getSongs();
  }, []);

  /*const filteredSongs = songs.filter(song =>
    song.songTitle.toLowerCase().includes(query.toLowerCase()) ||
    song.artist.toLowerCase().includes(query.toLowerCase())
  );*/

  const filteredSongs = [{
    id: "66b0b7272bdfef8ce031e9b2",
    title: "High and Dry",
    artist: "Radiohead",
    duration: 60,
    audioPath: "test",
    coverPath: "test",
    album: "Ok Computer"
  }]

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
      <div className="space-y-4">
        {filteredSongs.map((song) => (
          <MusicCard key={song.id} title={song.title} artist={song.artist} duration={song.duration} coverPath={song.coverPath}/>
        ))}
      </div>
    </div>
  );
};

export default Search;
