import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

const PlaylistCard = ({ playlist, onDelete, option}) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleDelete = () => {
    onDelete(playlist._id);
    setShowOptions(false);
  };

  return (
    <div className="relative max-w-sm min-w-80 rounded overflow-hidden shadow-lg bg-white cursor-pointer m-4 p-6">
        <Link href={`playlist/${playlist._id}`}>
          <div className="w-full h-60 flex items-center justify-center text-8xl">
            <Image src={'/vinyl.png'} alt="" width={400} height={400} className="p-5"/>
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-2xl mb-2 text-gray-500">
              <h2>{playlist.playlistName}</h2>
            </div>
            <p className="text-gray-700 text-lg">by {playlist.createdBy}</p>
          </div>
        </Link>
        <div className={`absolute top-2 right-2 text-gray-300 mx-2 z-20 ${option}`}>
          <button
            className="focus:outline-none text-2xl block"
            onClick={() => setShowOptions((prev) => !prev)}
            >
            •••
          </button>
          {showOptions && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-30">
              <button
                onClick={handleDelete}
                className="block px-4 py-2 text-red-600 hover:bg-red-100 w-full text-left"
                >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
  );
};

export default PlaylistCard;
