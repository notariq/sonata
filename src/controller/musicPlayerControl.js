import { useRef, useState } from 'react';

const [audioProgress, setAudioProgress] = useState(0);
const [isAudioPlaying, setIsAudioPlaying] = useState(false);
const [musicIndex, setMusicIndex] = useState(0);
const [musicTotalLength, setMusicTotalLength] = useState('04 : 38');
const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
const [videoIndex, setVideoIndex] = useState(0)

