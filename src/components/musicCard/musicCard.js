'use client'

import Image from 'next/image';
import { useAudio } from '@/contexts/audioContext';

const IMAGE_STREAM_URL = "http://localhost:8080/music/stream/image"

const MusicCard = ({ title, artist, duration, coverPath, id, musicList }) => {
    const minutes = Math.floor(duration / 60);
    const remainingSeconds = duration % 60;
    const songDuration = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

    const { playAudio, setMusicList }  = useAudio()


    const play = (id, musicList) => {
        playAudio(id);
        setMusicList(musicList);
    };

    return (
    <div
        className="flex items-center p-4 bg-white shadow-md rounded-lg cursor-pointer w-full pr-6"
        onClick={() => play(id, musicList)}
    >
        <Image 
        width={300}
        height={500}
        src={`${IMAGE_STREAM_URL}/${coverPath}`}
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
