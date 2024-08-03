import axios from "axios";

const getPlaylist = async () => {
    const response = await axios.get(`http://localhost:5000/api/playlist`);

    if (response.ok) {
        console.log('ok')
    }
}

export default { getPlaylist }