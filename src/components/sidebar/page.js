'use client'

import Link from 'next/link';
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { TbHome } from "react-icons/tb";
import { TbSearch } from "react-icons/tb";
import { TbPlaylist } from "react-icons/tb";
import { TbUser } from "react-icons/tb";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className={`${open ? 'w-64' : 'w-20'} duration-300 h-screen bg-black text-white flex flex-col sticky top-0`}>
      <GiHamburgerMenu 
        className='bg-gray-700 cursor-pointer rounded-full w-9 h-9 p-1 m-4'
        onClick={() => setOpen(!open)}
      />
      <div className={`${!open && "hidden"} p-4 text-2xl font-bold text-center mb-10`}>
        <Link href="/">SONATA</Link>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-2">
            <Link href="/">
              <div className={`flex gap-x-4 items-center block p-2 hover:bg-gray-700 rounded`}>
                <TbHome className='flex-shrink-0'/>
                <span className={`${!open && "hidden"} ml-4`}>Home</span>
              </div>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/search">
              <div className={`flex gap-x-4 items-center block p-2 hover:bg-gray-700 rounded`}>
                <TbSearch className='flex-shrink-0' />
                <span className={`${!open && "hidden"} ml-4`}>Search</span>
              </div>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/playlists">
              <div className={`flex gap-x-4 items-center block p-2 hover:bg-gray-700 rounded`}>
                <TbPlaylist className='flex-shrink-0' />
                <span className={`${!open && "hidden"} ml-4`}>Playlists</span>
              </div>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/profile">
              <div className={`flex gap-x-4 items-center block p-2 hover:bg-gray-700 rounded`}>
                <TbUser className='flex-shrink-0' />
                <span className={`${!open && "hidden"} ml-4`}>Profile</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
