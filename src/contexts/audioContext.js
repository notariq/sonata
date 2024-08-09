'use client'

import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AudioContext = createContext();

const API_URL = "http://localhost:4000/api/music";

export const AudioProvider = ({ children }) => {
    const [audioSrc, setAudioSrc] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);

    const playAudio = async (id) => {
        try{
            const response = await axios.get(`${API_URL}/${id}`)

            setAudioSrc(`http://localhost:4000/api/music/stream/audio/${response.data.audioPath}`);
            setImageSrc(`http://localhost:4000/api/music/stream/image/${response.data.coverPath}`);
            setCurrentSong(response.data);
            setIsPlaying(true);
        } catch(error) {
            console.log('error', error)
        }
    };

    const stopAudio = () => {
        setAudioSrc(null);
        setCurrentSong(null);
        setIsPlaying(false);
    };

    return (
        <AudioContext.Provider value={{
            audioSrc,
            imageSrc,
            isPlaying,
            currentSong,
            playAudio,
            stopAudio
        }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    return useContext(AudioContext);
};
