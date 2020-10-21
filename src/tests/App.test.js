import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
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
  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('About')).toBeInTheDocument();
  expect(getByText('Favorite Pokémons')).toBeInTheDocument();
});

test('checks if link "About" redirect to URL /about', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('About'));
  const { pathname } = history.location;
  expect(pathname).toEqual('/about');
});

test('checks if link "Favorite Pokémons" redirect to URL /favorites', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Favorite Pokémons'));
  const { pathname } = history.location;
  expect(pathname).toEqual('/favorites');
});

test('checks if link "Home" redirect to URL /', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText('Home'));
  const { pathname } = history.location;
  expect(pathname).toEqual('/');
});

test('checks if links redirect to page ', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/hoje-não');
  const erroMessage = getByText('Page requested not found');
  expect(erroMessage).toBeInTheDocument();
});
