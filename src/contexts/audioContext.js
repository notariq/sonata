'use client'

import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AudioContext = createContext();

const API_URL = "http://localhost:4000/api/music";

export const AudioProvider = ({ children }) => {
    const [audioSrc, setAudioSrc] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);

    const playAudio = async () => {
        try{
            const response = await axios.get(API_URL)
            
            setAudioSrc(`${API_URL}/${response.data.audioPath}`);
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
