const MUSIC_URL = "http://localhost:8080/music";

const fetchSongs = async (query) => {
  try {
      const response = await fetch(`${MUSIC_URL}?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return await response.json();
  } catch (error) {
      console.error('Error fetching songs:', error);
      return [];
  }
};

export default fetchSongs;
