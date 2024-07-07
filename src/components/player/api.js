'use client'

// src/components/musicplayer/page.js
import React, { useRef, useEffect } from 'react';

const MusicPlayer = ({ src, startTime, endTime }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    // Start playback from the specified start time
    audio.currentTime = startTime;

    // Update the time and stop playback at the specified end time
    const handleTimeUpdate = () => {
      if (audio.currentTime >= endTime) {
        audio.pause();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);

    // Cleanup event listener on component unmount
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [startTime, endTime]);

  return (
      <audio ref={audioRef} controls autoPlay className="hidden">
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
  );
};

export default MusicPlayer;