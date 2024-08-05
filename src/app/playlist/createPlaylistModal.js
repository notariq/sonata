import { useState } from 'react';

const CreatePlaylistModal = ({ onClose, onCreate }) => {
  const [playlistName, setPlaylistName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPlaylist = {
      playlistName: playlistName
    };
    onCreate(newPlaylist);
    setPlaylistName('');
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="playlistName" className="block text-gray-700">Playlist Name</label>
            <input
              type="text"
              id="playlistName"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full text-black"
              placeholder="Enter playlist name"
            />
          </div>
          <div className="flex justify-center">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
