import Link from "next/link";
import React from "react";


const PlaylistCard = ({ playlist }) => {
  return (
    <Link href={`./playlists/${playlist._id}`}>
      <div className="max-w-full rounded overflow-hidden shadow-lg bg-white cursor-pointer m-4">
      <svg className="w-full h-300" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill="url(#gradient)" /> 
      <circle cx="50" cy="50" r="20" fill="white" stroke="black" strokeWidth={0.2}/> 
      <circle cx="50" cy="50" r="1" fill="black" /> 
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stopColor="blue" />
          <stop offset="100%" stopColor="green" />
        </linearGradient>
      </defs>
    </svg>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-500">
            <h2>
              {playlist.playlistName}
            </h2>
          </div>
          <p className="text-gray-700 text-base">
            by {playlist.createdBy}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistCard