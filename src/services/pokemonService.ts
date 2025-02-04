import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonService = {
  getPokemons: async (offset = 0, limit = 20) => {
    const response = await axios.get(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
    );
    return response.data;
  },

  getPokemonDetails: async (id: string) => {
    const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
    return response.data;
  },

  searchPokemons: async (searchTerm: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/pokemon?limit=1118`);
      const results = response.data.results;
      
      const filteredResults = results.filter((pokemon: any) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // Return only first 20 results
      return { results: filteredResults.slice(0, 20) };
    } catch (error) {
      console.error('Error searching pokemons:', error);
      return { results: [] };
    }
  }
}; 