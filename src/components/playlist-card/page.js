import React from "react";

const playlistCard = () => {
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white cursor:hover">
        <img class="w-full" src="https://via.placeholder.com/300" alt="Playlist Cover" />
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Playlist Title</div>
            <p class="text-gray-700 text-base">
                This is a description of the playlist. It includes various genres and artists.
            </p>
        </div>
        <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#music</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#playlist</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#genres</span>
        </div>
    </div>
  )
}

export default playlistCard;