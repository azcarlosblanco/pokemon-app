import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { fetchPokemonDetails } from '../features/pokemon/pokemonSlice';
import type { RootState, AppDispatch } from '../store';
import { PokemonModalProps } from '../types';


export const PokemonModal = ({ pokemon, onClose }: PokemonModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedPokemon = useSelector((state: RootState) => state.pokemon.selectedPokemon);

  useEffect(() => {
    if (pokemon) {
      const pokemonId = pokemon.url.split('/')[6];
      dispatch(fetchPokemonDetails(pokemonId));
    }
  }, [pokemon, dispatch]);

  if (!selectedPokemon) return null;

  return (
    <Dialog open={!!pokemon} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{selectedPokemon.name}</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Abilities:</Typography>
        <List>
          {selectedPokemon.abilities.map((ability) => (
            <ListItem key={ability.ability.name}>
              <ListItemText primary={ability.ability.name} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h6">Moves:</Typography>
        <List>
          {selectedPokemon.moves.slice(0, 5).map((move) => (
            <ListItem key={move.move.name}>
              <ListItemText primary={move.move.name} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h6">Forms:</Typography>
        <List>
          {selectedPokemon.forms.map((form) => (
            <ListItem key={form.name}>
              <ListItemText primary={form.name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}; 