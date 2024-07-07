import { useRef, useState } from 'react';

const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'NaN',
    songArtist: 'NaN',
    songSrc: '',
  })
const [isAudioPlaying, setIsAudioPlaying] = useState(false);
const [audioProgress, setAudioProgress] = useState(0);
const [musicCurrentTime, setMusicCurrentTime] = useState('NaN : NaN');
const [musicTotalLength, setMusicTotalLength] = useState('NaN : NaN');

export default audioPlay = () => {
    setIsAudioPlaying(true);
};
