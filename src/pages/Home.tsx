import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Container,
  Box,
  Pagination,
  CircularProgress,
} from '@mui/material';
import { fetchPokemons, searchPokemons } from '../features/pokemon/pokemonSlice';
import { PokemonModal } from '../components/PokemonModal';
import { Pokemon } from '../types';
import { useDebounce } from '../hooks/useDebounce';

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((state: RootState) => state.pokemon);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const debouncedSearch = useDebounce(search, 300);

  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    if (debouncedSearch) {
      dispatch(searchPokemons(debouncedSearch));
    } else {
      dispatch(
        fetchPokemons({
          offset: (page - 1) * ITEMS_PER_PAGE,
          limit: ITEMS_PER_PAGE,
        })
      );
    }
  }, [dispatch, page, debouncedSearch]);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <TextField
          fullWidth
          label="Search Pokemon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 4 }}
        />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {list.map((pokemon) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
                  <Card
                    onClick={() => setSelectedPokemon(pokemon)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        pokemon.url.split('/')[6]
                      }.png`}
                      alt={pokemon.name}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {pokemon.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {!search && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={Math.ceil(1118 / ITEMS_PER_PAGE)}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                />
              </Box>
            )}
          </>
        )}
      </Box>
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </Container>
  );
}; 