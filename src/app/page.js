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
        const response = await axios.get('http://localhost:5000/api/playlist/');
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
    <div className="">
      <Header />

      <h1 className="text-2xl font-bold mb-4">Daily Mixes</h1>
      <div className="flex flex-wrap -mx-4 mb-10">
        {dailyMixPlaylist.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} option={"hidden"} />
        ))}
      </div>
      <h1 className="text-2xl font-bold mb-4">New Release Album</h1>
      <div className="flex flex-wrap -mx-4">
        {albumPlaylist.map((playlist) => (
          <PlaylistCard key={playlist._id} playlist={playlist} option={"hidden"} />
        ))}
      </div>
    </div>
  );
}
