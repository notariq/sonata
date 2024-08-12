import axios from "axios";

const API_URL = 'http://localhost:5000/api/playlist'

export const fetchPlaylistId = async (id) => {
    try {
        const response = await axios.get(process.env.API_URL || `${API_URL}/${id}`);   
        return response.data.songs;
    } catch (error) {
        throw error;
    }
};

export const addMusic = async (playlistId, musicId) => {
    try {
        const response = await axios.post(`${API_URL}/${playlistId}/add-music`, {musicId: musicId});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const removeMusic = async (playlistId, musicId) => {
    try {
        const response = await axios.post(`${API_URL}/${playlistId}/remove-music`, {musicId: musicId});
        return response.data;
    } catch (error) {
        throw error;
    }
};