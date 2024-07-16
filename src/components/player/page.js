'use client'

import Image from 'next/image';
import React from 'react';
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { useAudio } from '@/app/audioContext';

const Player = () => {
    const { audioSrc, currentSong, nextSong, previousSong } = useAudio();

    const song = currentSong || {
        songPicturePath: '',
        songTitle: 'No song playing',
        artist: ''
    };

    return (
        <div className='h-[10%] bg-black flex justify-between items-center text-white px-4 p-5 border-t border-gray-800'>
            <div className='hidden lg:flex items-center gap-4'>
                <Image 
                    className='w-12 h-12 bg-gray-100 border border-gray-800' 
                    src={song.songPicturePath} 
                    style={{ backgroundColor: 'gray' }}
                    alt={song.artist}
                />
                <div>
                    <p>{song.songTitle}</p>
                    <p>{song.artist}</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-1 m-auto'>
                <div className='flex gap-8 items-center justify-center my-2'>
                    <span className='cursor-pointer text-2xl' onClick={previousSong}>
                        <MdSkipPrevious />
                    </span>
                    <div className='w-[60vw] max-w-[500px] bg-gray-100 rounded-full cursor-pointer relative px-5 py-1 flex items-center justify-between'>
                        <audio controls autoPlay className="w-full" src={audioSrc} />
                    </div>
                    <span className='cursor-pointer text-2xl' onClick={nextSong}>
                        <MdSkipNext />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Player;
