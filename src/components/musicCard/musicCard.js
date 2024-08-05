'use client'

import Image from 'next/image';
import { useAudio } from '@/contexts/audioContext';

const MusicCard = ({ title, artist, duration, coverPath }) => {
    const minutes = Math.floor(duration / 60);
    const remainingSeconds = duration % 60;
    const songDuration = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

    return (
    <div
        className="flex items-center p-4 bg-white shadow-md rounded-lg cursor-pointer"
        onClick={'http://localhost:4000/api/music'}
    >
        <Image 
        width={300}
        height={500}
        src={`/${coverPath}`} 
        className="h-16 w-16 object-cover rounded" 
        alt={"cover"} 
        />
        <div className="ml-4 flex-1">
        <div className="text-sm text-gray-500">{artist}</div>
        <div className="text-lg font-medium text-gray-500">{title}</div>
        </div>
        <div className="text-sm text-gray-500">{songDuration}</div>
    </div>
    );
};

export default MusicCard;
