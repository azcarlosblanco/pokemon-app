import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { MainLayout } from '../layouts/MainLayout';
import authReducer from '../features/auth/authSlice';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('MainLayout', () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <MainLayout>
            <div>Test Content</div>
          </MainLayout>
        </BrowserRouter>
      </Provider>
    );
  };

  test('renders app title and logout button', () => {
    renderComponent();
    expect(screen.getByText('Pokemon App')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('renders children content', () => {
    renderComponent();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('handles logout correctly', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Logout'));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
}); 