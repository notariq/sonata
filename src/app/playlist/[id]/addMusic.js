import React, { useState, useEffect } from 'react';
import fetchSongs from '@/app/search/api';
import { addMusic } from './api';

export default function AddMusic({ playlistId, onSongAdded }) {
    const [isVisible, setIsVisible] = useState(false);
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

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const addSongHandler = async (playlistId, musicId) => {
        try{  
            await addMusic(playlistId, musicId);
            onSongAdded();
        } catch(error) {
            alert(error.response.data.error);
        };
    };

    return (
        <div className="border-t border-gray-600 p-5 mt-6">
            <div className="mb-4 justify-between flex">
                <h2 className="font-bold text-gray-300 text-xl">Add Musics</h2>
                <button
                    onClick={toggleVisibility}
                    className="bg-gray-800 hover:bg-gray-900 border text-white py-1 px-3 rounded-full text-sm font-bold"
                >
                    {isVisible ? 'Hide' : 'Show'}
                </button>
            </div>

            {isVisible && (
                <div className='px-3'>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="bg-gray-200 py-1 mb-4 border border-gray-700 rounded-md text-gray-500 text-xs pl-2 w-full"
                        placeholder="Search by title or artist"
                    />
                    {query === '' && <p className='text-gray-300 text-center text-sm py-6'>Search Music...</p>}
                    <div className="flex gap-4">
                        {songs.length > 0 && songs.map((song) => (
                            <div key={song.id} className='bg-gray-800 text-gray-300 w-[50%] p-6 rounded-md border-2 border-gray-700 flex justify-between'>
                                <div>
                                    <p className='font-bold text-xl mb-1'>{song.title}</p>
                                    <p className='text-sm'>{song.artist}</p>
                                </div>
                                <button 
                                    className='bg-gray-500 rounded-full text-xs'
                                    onClick={() => addSongHandler(playlistId, song.id)}
                                > 
                                    Add to Playlist
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
