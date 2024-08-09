'use client'

import Image from 'next/image';
import React from 'react';
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { useAudio } from '@/contexts/audioContext';

const Player = () => {
    const { audioSrc, imageSrc, currentSong, nextSong, previousSong } = useAudio();

    const song = currentSong;

    return (
        <div className='h-[10%] bg-black flex justify-between items-center text-white px-4 p-5 border-t border-gray-800'>
            {!currentSong ? (
                <p className='ml-5'>No song playing</p>
            ) : (
            <div className='hidden lg:flex items-center gap-4'>
            <Image 
                className='w-12 h-12 bg-gray-100 border border-gray-800' 
                width={500}
                height={300}
                src={imageSrc} 
                style={{ backgroundColor: 'gray' }}
                alt={"cover"}
            />
            <div>
                <p>{song.title}</p>
                <p>{song.artist}</p>
            </div>
            </div>
            )}
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
