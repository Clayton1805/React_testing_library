import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('check if Home, About and Favorite Pokémon links exist', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText('Home');
  expect(home).toBeInTheDocument();
  const about = getByText('About');
  expect(about).toBeInTheDocument();
  const favoritePokemons = getByText('Favorite Pokémons');
  expect(favoritePokemons).toBeInTheDocument();
});
