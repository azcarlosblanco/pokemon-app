import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Home } from '../pages/Home';
import pokemonReducer from '../features/pokemon/pokemonSlice';
// act is an important utility in React testing that ensures all updates related to state changes and effects are processed and applied before making assertions. 
import { act } from 'react';

// Mock the pokemonService
jest.mock('../services/pokemonService', () => ({
  pokemonService: {
    getPokemons: jest.fn().mockResolvedValue({
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      ],
    }),
    searchPokemons: jest.fn().mockResolvedValue({
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      ],
    }),
  },
}));

describe('Home', () => {
  const store = configureStore({
    reducer: {
      pokemon: pokemonReducer,
    },
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  };

  test('renders search input', async () => {
    await act(async () => {
      renderComponent();
    });
    expect(screen.getByLabelText('Search Pokemon')).toBeInTheDocument();
});

  test('displays pokemon cards after loading', async () => {
    await act(async () => {
      renderComponent();
    });
    
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('charmander')).toBeInTheDocument();
    });
  });

  test('handles search input', async () => {
    await act(async () => {
      renderComponent();
    });
    
    const searchInput = screen.getByLabelText('Search Pokemon');
    
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'bulba' } });
    });
    
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.queryByText('charmander')).not.toBeInTheDocument();
    });
  });

  test('renders pagination when not searching', async () => {
    await act(async () => {
      renderComponent();
    });
    
    await waitFor(() => {
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });
}); 