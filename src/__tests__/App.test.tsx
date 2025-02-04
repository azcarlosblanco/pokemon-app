import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import pokemonReducer from '../features/pokemon/pokemonSlice';
import App from '../App';

const store = configureStore({
  reducer: {
    auth: authReducer,
    pokemon: pokemonReducer
  }
});

describe('App', () => {
  test('renders login page when not authenticated', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    expect(screen.getByText(/Pokemon App Login/i)).toBeInTheDocument();
  });
}); 