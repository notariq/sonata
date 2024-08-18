'use client'

import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AudioContext = createContext();

const MUSIC_URL = "http://localhost:8080/music";
const IMAGE_STREAM_URL = "http://localhost:8080/music/stream/image"
const AUDIO_STREAM_URL = "http://localhost:4000/api/music/stream/audio" //error net::ERR_BLOCKED_BY_RESPONSE.NotSameOriginnet::ERR_BLOCKED_BY_RESPONSE.NotSameOrigin

export const AudioProvider = ({ children }) => {
    const [audioSrc, setAudioSrc] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [musicList, setMusicList] = useState(null);

    const playAudio = async (id) => {
        try {
            const response = await axios.get(`${MUSIC_URL}/${id}`);
            setAudioSrc(`${AUDIO_STREAM_URL}/${response.data.audioPath}`);
            setImageSrc(`${IMAGE_STREAM_URL}/${response.data.coverPath}`);
            setCurrentSong(response.data);
            setIsPlaying(true);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    // Function to stop the audio
    const stopAudio = () => {
        setAudioSrc(null);
        setCurrentSong(null);
        setIsPlaying(false);
    };

    // Function to play the next song
    const nextSong = () => {
        const currentIndex = musicList.findIndex(song => song.id === currentSong.id);
        if (currentIndex === -1 || currentIndex === musicList.length - 1) return;
        if (currentSong) {
            const nextIndex = (currentIndex + 1) % musicList.length;
            playAudio(musicList[nextIndex].id);
        }
    };

    // Function to play the previous song
    const previousSong = () => {
        const currentIndex = musicList.findIndex(song => song.id === currentSong.id);
        if (currentIndex <= 0) return;
        if (currentSong) {
            const prevIndex = (currentIndex - 1 + musicList.length) % musicList.length;
            playAudio(musicList[prevIndex].id);
        }
    };

    return (
        <AudioContext.Provider value={{
            audioSrc,
            imageSrc,
            isPlaying,
            currentSong,
            playAudio,
            stopAudio,
            nextSong,
            previousSong,
            setMusicList // Add this to update musicList
        }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    return useContext(AudioContext);
};