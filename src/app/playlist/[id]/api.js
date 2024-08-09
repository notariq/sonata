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

export const fetchBatchMusic = async (musicId) => {
    try {
        const response = await axios.post(`${API_URL}/${id}/`, (musicId));
        return response.data;
    } catch (error) {
        throw error;
    }
};