const fetchSongs = async (query) => {
  try {
      const response = await fetch(`http://localhost:4000/api/music?query=${encodeURIComponent(query)}`);
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
