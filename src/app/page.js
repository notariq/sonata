'use client'

import React, { useEffect, useState } from 'react';
import PlaylistCard from "@/components/playlistCard/page";

export default function Page() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('http://localhost:8080/playlist/');
        const data = await response.json();
        const filteredData = data.filter(playlist => playlist.createdBy === 'sonata');
        setPlaylists(filteredData);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  return (
    <div className="container">
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-4">Daily Mixes</h1>

        <div className="flex flex-wrap -mx-4">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist._id} playlist={playlist} />
          ))}
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4">New Release Album</h1>
    </div>
  );
}

