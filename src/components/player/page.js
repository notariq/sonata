import React from 'react'
import { FaRegPauseCircle } from "react-icons/fa";
import { CgPlayTrackNext } from "react-icons/cg";


const Player = () => {
    return (
      <div className='h-[10%] bg-black flex justify-between items-center text-white px-4 p-5 border-t  border-gray-800'>
        <div className='hidden lg:flex items-center gap-4'>
            <img className='w-12' src='https://i.scdn.co/image/ab67616d0000b273c8a11e48c91a982d086afc69'/>
            <div>
                <p>Stairway to Heaven</p>
                <p>Led Zeppelin</p>
            </div>
        </div>
        <div className='flex flex-col items-center gap-1 m-auto'>
            <div className='flex gap-4'>
            <CgPlayTrackNext className="rotate-180 text-2xl" />
            <FaRegPauseCircle className="text-2xl" />
            <CgPlayTrackNext className="text-2xl" />
            </div>
            <div className='flex items-center gap-5'>
                <p>1:06</p>
                <div className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                    <hr className='h-1 border-none w-0 bg-green-800 rounded-full'/>
                </div>
                <p>4:20</p>
            </div>
        </div>
      </div>
    );
  };
  
  export default Player;