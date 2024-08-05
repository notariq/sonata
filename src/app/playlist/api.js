import axios from 'axios';

const API_URL = 'http://localhost:5000/api/playlist';

export const fetchPlaylists = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPlaylist = async (newPlaylist) => {
  const response = await axios.post(API_URL, newPlaylist);
  return response.data;
};

export const deletePlaylist = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
