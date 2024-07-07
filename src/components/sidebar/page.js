'use client'

import Link from 'next/link';
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { TbHome } from "react-icons/tb";
import { TbSearch } from "react-icons/tb";
import { TbPlaylist } from "react-icons/tb";
import { TbHeart } from "react-icons/tb";
import { TbUser } from "react-icons/tb";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className={`${open ? 'w-64' : 'w-20'} duration-300 min-h-screen bg-black text-white flex-col left-0 bottom-0 top-0`}>
      <GiHamburgerMenu 
        className='bg-gray-700 absolute cursor-pointer rounded-full w-9 h-9 p-1 top-4 left-5'
        onClick={() => setOpen(!open)}
      />
      <div className={`${!open && "scale-0"} p-4 text-2xl font-bold text-center mb-10 pl-7`}>
        <Link href="/">SONATA</Link>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <li className="mb-2">
            <Link href="/">
              <div className={`flex gap-x-4 items-center block p-2 hover:bg-gray-700 rounded`}>
                  <TbHome className='absolute left-7'/>
                  <h1 className={`${!open && "scale-0"} pl-8`}>Home</h1>
              </div>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/search">
            <div className={`flex gap-x-4 items-center block p-2 hover:bg-gray-700 rounded`}>
                <TbSearch  className='absolute left-7' />
                <h1 className={`${!open && "scale-0"} pl-8`}>Search</h1>
              </div>            </Link>
          </li>
          <li className="mb-2">
            <Link href="/playlists">
              <div className={`flex gap-x-4 items-center block p-2 hover:bg-gray-700 rounded`}>
                <TbPlaylist className='absolute left-7' />
                <h1 className={`${!open && "scale-0"} pl-8`}>Playlists</h1>
              </div>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/favorites">
            <div className={`flex gap-x-4 items-center block p-2 hover:bg-gray-700 rounded`}>
                <TbHeart className='absolute left-7' />
                <h1 className={`${!open && "scale-0"} pl-8`}>Favorites</h1>
              </div>            </Link>
          </li>
          <li className="mb-2">
            <Link href="/user">
            <div className={`flex gap-x-4 items-center block p-2 hover:bg-gray-700 rounded`}>
                <TbUser className='absolute left-7' />
                <h1 className={`${!open && "scale-0"} pl-8`}>User</h1>
              </div>            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
