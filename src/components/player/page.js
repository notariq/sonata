'use client'

import React from 'react'
import { useState, useRef } from 'react';

import { FaRegPauseCircle } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";

import MusicPlayer from './api';


const Player = () => {
    const [currentMusicDetails, setCurrentMusicDetails] = useState({
        songName: 'NaN',
        songArtist: 'NaN',
        songSrc: '',
      })
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const [musicCurrentTime, setMusicCurrentTime] = useState('NaN : NaN');
    const [musicTotalLength, setMusicTotalLength] = useState('NaN : NaN');

    const audioRef = useRef(null);

    return (
      <div className='h-[10%] bg-black flex justify-between items-center text-white px-4 p-5 border-t  border-gray-800'>
        <div className='hidden lg:flex items-center gap-4'>
            <img className='w-12 bg-white border-gray-800'/>
            <div>
                <p>{currentMusicDetails.songName}</p>
                <p>{currentMusicDetails.songArtist}</p>
            </div>
        </div>
        <div className='flex flex-col items-center gap-1 m-auto'>
            <div className='flex gap-8 items-center justify-center mb-3'>
                <span className='cursor-pointer text-2xl' >
                    <MdSkipPrevious />
                </span>
                <span className='cursor-pointer text-2xl'>
                    {isAudioPlaying ? <FaRegPauseCircle /> : <FaRegPlayCircle />}
                </span>
                <span className='cursor-pointer text-2xl'>
                    <MdSkipNext />
                </span>
            </div>
            <div className='flex items-center gap-5'>
                <p>{musicCurrentTime}</p>
                    <div className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer relative px-5 py-1">
                        <input
                            type="range"
                            name="musicProgressBar"
                            value={audioProgress}
                            className="w-full h-2 rounded-full outline-none bg-transparent"
                            style={{
                            background: 'linear-gradient(to right, #4CAF50, #4CAF50)',
                            backgroundSize: '50% 100%',
                            backgroundPosition: 'center',
                            }}
                        />
                        <MusicPlayer src="/storage/Lamp-ForLover/1.mp3" startTime={10} endTime={20} />
                    </div>
                <p>{musicTotalLength}</p>
            </div>
        </div>
      </div>
    );
  };
  
  export default Player;