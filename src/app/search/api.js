const fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/music/66b0b7272bdfef8ce031e9b2');
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
  