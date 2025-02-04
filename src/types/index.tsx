interface Pokemon {
    name: string;
    url: string;
    abilities: {
        ability: {
            name: string;
            url: string;
        }
    }[];
    moves: {
        move: {
            name: string;
            url: string;
        }
    }[];
    forms: {
        name: string;
        url: string;
    }[];
}

interface PokemonState {
    list: Pokemon[];
    selectedPokemon: Pokemon | null;
    loading: boolean;
    error: string | null;
}

interface PokemonModalProps {
    pokemon: Pokemon;
    onClose: () => void;
  }

export type { Pokemon, PokemonState, PokemonModalProps };