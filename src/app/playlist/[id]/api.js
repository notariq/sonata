import axios from "axios";

const API_URL = 'http://localhost:8080/playlist'

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