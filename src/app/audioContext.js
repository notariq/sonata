'use client'

import React, { createContext, useState, useContext } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const [audioSrc, setAudioSrc] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);

    const playAudio = (src, song) => {
        setAudioSrc(src);
        setCurrentSong(song);
        setIsPlaying(true);
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
