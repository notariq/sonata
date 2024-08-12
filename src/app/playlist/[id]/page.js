'use client'

import React, { useState, useEffect } from "react";
import AddMusic from "./addMusic";
import MusicCard from "@/components/musicCard/musicCard";
import { useAuth } from "@/contexts/authContext";
import { removeMusic } from "./api";
import axios from "axios";

const Playlists = ({ params }) => {
  const [songs, setSongs] = useState([]);
  const [playlistData, setPlaylistData] = useState({title: '', user: ''});

  const [error, setError] = useState(null);  
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, user } = useAuth();

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const playlistResponse = await axios.get(`http://localhost:5000/api/playlist/${params.id}`);
      setPlaylistData({title: playlistResponse.data.playlistName, user: playlistResponse.data.createdBy});
      
      const songsResponse = await axios.post(`http://localhost:4000/api/music/batch`, {id: playlistResponse.data.songs});
      setSongs(songsResponse.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch songs");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [params.id]);

  const onDelete = async (playlistId, songId) => {
    try {
      await removeMusic(playlistId, songId);
      setSongs(prevSongs => prevSongs.filter(song => song.id !== songId));
    } catch (error) {
      console.error("Failed to delete the song:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <p className="text-xl">Error While Fetching Playlist or Musics</p>
      </div>
    );
  }
  
  return (
    <div className='container'>
      <div className="border-b border-gray-600 mb-6">
        <h1 className="text-4xl font-bold mb-2">{playlistData.title}</h1>
        <p className="text-gray-300 mb-4">{playlistData.user}</p>
      </div>
      <div className="space-y-4">
      {songs.map((song) => (
        <div key={song.id} className="relative flex items-center">
          <MusicCard
            title={song.title}
            artist={song.artist}
            duration={song.duration}
            coverPath={song.coverPath}
            id={song.id}
          />
          {isAuthenticated && user.username === playlistData.user && (
            <button
              onClick={() => onDelete(params.id, song.id)}
              className="absolute right-0 bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-800 transition duration-300 border border-white"
              style={{ transform: 'translateX(50%)' }}
            >
              &times;
            </button>
          )}
        </div>
      ))}
      </div>

      {isAuthenticated && user.username === playlistData.user && (
        <AddMusic playlistId={params.id} onSongAdded={fetchSongs} />
      )}
    </div>
  )
};

export default Playlists;
