'use client';

import React, { useEffect, useState } from 'react';

import PlaylistCard from "@/components/playlistCard/playlistCard";
import Header from '@/components/header';
import axios from 'axios';

const playlistAllURL = "http://localhost:8080/playlist/all"

export default function Page() {

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(playlistAllURL);
        setPlaylists(response.data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };
    fetchPlaylists();
  }, []);

  const dailyMixPlaylist = playlists.filter(playlist => playlist.playlistName.startsWith('Daily Mix'));

  return (
    <div className="container mx-auto px-4">
      <Header />
      <h1 className="text-3xl md:text-4xl font-bold mb-4 pb-3 border-b border-gray-600">Daily Mixes</h1>
      <div className="horizontal-scroll mb-8 max-w-full">
        <div className="flex space-x-4">
          {dailyMixPlaylist.map((playlist) => (
            <PlaylistCard 
              key={playlist._id} 
              playlist={playlist} 
              option={"hidden"}
              className="flex-shrink-0 w-48 sm:w-56 md:w-64 lg:w-72"
            />
          ))}
        </div>
      </div>
    </div>
  );  
}
