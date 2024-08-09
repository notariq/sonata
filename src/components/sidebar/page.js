'use client'

import Link from 'next/link';
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { TbHome, TbSearch, TbPlaylist, TbUser } from "react-icons/tb";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className={`${open ? 'w-64' : 'w-20'} duration-300 h-screen bg-black text-white flex flex-col sticky top-0`}>
      <div className="flex items-center justify-start gap-3 p-4">
        <GiHamburgerMenu 
          className='bg-gray-700 cursor-pointer rounded-full w-9 h-9 p-1'
          onClick={() => setOpen(!open)}
        />
        {open && (
          <div className="text-2xl font-bold">
            <Link href="/">SONATA</Link>
          </div>
        )}
      </div>
      <nav className="flex-1 p-4">
        <ul>
          <SidebarItem href="/" icon={<TbHome />} label="Home" open={open} />
          <SidebarItem href="/search" icon={<TbSearch />} label="Search" open={open} />
          <SidebarItem href="/playlist" icon={<TbPlaylist />} label="Playlist" open={open} />
          <SidebarItem href="/profile" icon={<TbUser />} label="Profile" open={open} />
        </ul>
      </nav>
    </div>
  );
};

const SidebarItem = ({ href, icon, label, open }) => {
  return (
    <li className="mb-2">
      <Link href={href}>
        <div className={`flex gap-x-4 items-center block p-2 hover:bg-gray-700 rounded`}>
          {icon}
          {open && <span className="ml-4">{label}</span>}
        </div>
      </Link>
    </li>
  );
};

export default Sidebar;
