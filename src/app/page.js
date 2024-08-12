'use client';

import React, { useEffect, useState } from 'react';

import PlaylistCard from "@/components/playlistCard/playlistCard";
import Header from '@/components/header';
import axios from 'axios';

export default function Page() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get('http://localhost:8080/playlist/all');
        setPlaylists(response.data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };
    fetchPlaylists();
  }, []);

  const dailyMixPlaylist = playlists.filter(playlist => playlist.playlistName.startsWith('Daily Mix'));
  const albumPlaylist = playlists.filter(playlist => playlist.playlistName.startsWith('Album'));

  return (
    <div className="container">
      <Header />
      <h1 className="text-4xl font-bold mb-2 pb-3 border-b border-gray-600">Daily Mixes</h1>
      <div className='horizontal-scroll mb-8'>
        <div className="flex max-w-max">
          {dailyMixPlaylist.map((playlist) => (
            <PlaylistCard key={playlist._id} playlist={playlist} option={"hidden"} />
          ))}
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-2 pb-3 border-b border-gray-600">For You</h1>
      <div className="flex flex-wrap -mx-4">
        {albumPlaylist.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} option={"hidden"} />
        ))}
      </div>
    </div>
  );
}
