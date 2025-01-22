import axios from 'axios';

const fetchMarkets = async (cursor = null) => {
  try {
    const response = await axios.get('https://clob.polymarket.com/markets', {
      params: { next_cursor: cursor }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching markets:", error);
    return null;
  }
};

export { fetchMarkets };
