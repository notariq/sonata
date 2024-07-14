'use client'

import React, { createContext, useState, useContext } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const [audioSrc, setAudioSrc] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [songs, setSongs] = useState([]);

    const playAudio = (src, index, songsList) => {
        setAudioSrc(src);
        setIsPlaying(true);
    };

    const nextSong = () => {
        if (songs.length > 0 && currentIndex !== null) {
            const nextIndex = (currentIndex + 1) % songs.length;
            const nextSong = songs[nextIndex];
            playAudio(nextSong.audioSrc, nextIndex, songs);
        }
    };

    const previousSong = () => {
        if (songs.length > 0 && currentIndex !== null) {
            const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
            const prevSong = songs[prevIndex];
            playAudio(prevSong.audioSrc, prevIndex, songs);
        }
    };

    return (
        <AudioContext.Provider value={{
            audioSrc, 
            isPlaying, 
            playAudio, 
            nextSong, 
            previousSong,
            currentIndex,
        }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    return useContext(AudioContext);
};
