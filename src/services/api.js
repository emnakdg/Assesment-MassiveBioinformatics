import axios from 'axios';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

// Tüm karakterleri yükleyen bir işlev
export const fetchAllCharacters = async () => {
  let allCharacters = [];
  let nextUrl = `${API_BASE_URL}/character`;

  while (nextUrl) {
    try {
      const response = await axios.get(nextUrl);
      allCharacters = [...allCharacters, ...response.data.results];
      nextUrl = response.data.info.next; // Sonraki sayfanın URL'si
    } catch (error) {
      console.error('API Fetch Error:', error);
      throw error;
    }
  }

  return allCharacters;
};

export const fetchCharacterDetails = async (id) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await response.json();
    return data;
  };
