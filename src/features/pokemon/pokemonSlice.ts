import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { pokemonService } from '../../services/pokemonService';
import { PokemonState } from '../../types';

export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async ({ offset, limit }: { offset: number; limit: number }) => {
    const response = await pokemonService.getPokemons(offset, limit);
    return response;
  }
);

export const fetchPokemonDetails = createAsyncThunk(
  'pokemon/fetchPokemonDetails',
  async (id: string) => {
    const response = await pokemonService.getPokemonDetails(id);
    return response;
  }
);

export const searchPokemons = createAsyncThunk(
  'pokemon/searchPokemons',
  async (searchTerm: string) => {
    const response = await pokemonService.searchPokemons(searchTerm);
    return response;
  }
);

const initialState: PokemonState = {
  list: [],
  selectedPokemon: null,
  loading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.results;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(fetchPokemonDetails.fulfilled, (state, action) => {
        state.selectedPokemon = action.payload;
      })
      .addCase(searchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.results;
      })
      .addCase(searchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default pokemonSlice.reducer; 