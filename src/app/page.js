'use client';

import React, { useEffect, useState } from 'react';
import PlaylistCard from "@/components/playlistCard/page";

export default function Page() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('http://localhost:8080/playlist/');
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  if (loading) {
    return(
      <div className='flex items-center justify-center'>
        <p>Loading...</p>
      </div>
    );
  }

  const dailyMixPlaylist = playlists.filter(playlist => playlist.playlistName.startsWith('Daily Mix'));
  const albumPlaylist = playlists.filter(playlist => playlist.playlistName.startsWith('Album'));

  return (
    <div className="container">
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
