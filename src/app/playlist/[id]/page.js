'use client'

import React, { useState, useEffect } from "react";
import { fetchPlaylistId } from './api';
import MusicCard from "@/components/musicCard/musicCard";
import axios from "axios";

const Playlists = ({ params }) => {
  const [songs, setSongs] = useState([]);
  const [playlistData, setPlaylistData] = useState({title: '', user: ''});

  const [error, setError] = useState(null);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5000/api/playlist/${params.id}`)
      .then(response => {
        setPlaylistData({title: response.data.playlistName, user: response.data.createdBy});
        setLoading(false);
        return axios.post(`http://localhost:4000/api/music/batch`, {id: response.data.songs})
      }).then(response => {
        setSongs(response.data);
      });


  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500 text-xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>{playlistData.title}</h1>
      <p>{playlistData.user}</p>
      <div className="space-y-4">
        {songs.map((song) => (
          <MusicCard
            key={song.id}
            title={song.title}
            artist={song.artist}
            duration={song.duration}
            coverPath={song.coverPath}
            id={song.id}
          />
        ))}
      </div>
    </div>
  )
};

export default Playlists;
