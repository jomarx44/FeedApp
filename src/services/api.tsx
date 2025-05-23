import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character';

export const getCharacters = async (page: number = 1) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}`);
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
