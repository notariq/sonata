'use client'

import Image from 'next/image';
import { useAudio } from "@/app/audioContext";
import React, { useState, useEffect } from "react";

const Playlists = ({ params }) => {
  const { playAudio } = useAudio();

  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [availableSongs, setAvailableSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddMusicModal, setShowAddMusicModal] = useState(false);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(`http://localhost:8080/playlist/${params.id}`);
        const data = await response.json();
        setPlaylist(data);

        if (data.songs.length > 0) {
          const songResponse = await fetch('http://localhost:8080/song/batch', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ songIds: data.songs }),
          });

          const songData = await songResponse.json();
          setSongs(songData);
        } else {
          setSongs([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    const fetchAvailableSongs = async () => {
      try {
        const response = await fetch(`http://localhost:8080/song`);
        const data = await response.json();
        setAvailableSongs(data);
      } catch (error) {
        console.error('Error fetching available songs:', error);
      }
    };

    fetchPlaylist();
    fetchAvailableSongs();
  }, [params.id]);

  const handleAddMusic = async () => {
    if (selectedSong) {
      try {
        const response = await fetch(`http://localhost:8080/playlist/${params.id}/add-music`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ musicId: selectedSong._id }),
        });

        if (response.ok) {
          const updatedPlaylist = await response.json();
          setPlaylist(updatedPlaylist);

          const updatedSongs = [...songs, selectedSong];
          setSongs(updatedSongs);

          setSelectedSong(null);
          setShowAddMusicModal(false);
        } else {
          console.error('Error adding music to playlist');
        }
      } catch (error) {
        console.error('Error adding music:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center'>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">{playlist.playlistName}</h1>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowAddMusicModal(true)}
      >
        + Add Music
      </button>

      {showAddMusicModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded shadow-md">
            <select
              value={selectedSong ? selectedSong._id : ''}
              onChange={(e) => {
                const selected = availableSongs.find(song => song._id === e.target.value);
                setSelectedSong(selected);
              }}
              className="border p-2 mb-2 w-full text-black"
            >
              <option value="" className="text-black">--Select a Song--</option>
              {availableSongs.map(song => (
                <option className="text-black" key={song._id} value={song._id}>{song.songTitle} - {song.artist}</option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded mr-2"
                onClick={handleAddMusic}
              >
                Add
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                onClick={() => setShowAddMusicModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {songs.map((song) => (
          <div key={song._id} className="w-full flex items-center p-4 bg-white shadow-md rounded-lg cursor-pointer" onClick={() => playAudio(song.songPath, song)}>
            <Image src={song.songPicturePath} className="h-16 w-16 object-cover rounded flex-shrink-0" alt={`${song.songTitle} cover`} />
            <div className="ml-4 flex-1">
              <div className="text-sm text-gray-500">{song.artist}</div>
              <div className="text-lg font-medium text-gray-900">{song.songTitle}</div>
            </div>  
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlists;
