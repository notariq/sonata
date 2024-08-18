import axios from 'axios';

const PLAYLIST_URL = 'http://localhost:8080/playlist';

export const fetchPlaylists = async () => {
  const response = await axios.get(PLAYLIST_URL);
  return response.data;
};

export const createPlaylist = async (newPlaylist) => {
  const response = await axios.post(PLAYLIST_URL, newPlaylist);
  return response.data;
};

export const deletePlaylist = async (id) => {
  await axios.delete(`${PLAYLIST_URL}/${id}`);
};
