import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

test('1', () => {
  const { getByTestId, getByAltText } = renderWithRouter(<App />);

  expect(getByTestId('pokemon-name').innerHTML).toEqual('Pikachu');
  expect(getByTestId('pokemonType').innerHTML).toEqual('Electric');
  expect(getByTestId('pokemon-weight').innerHTML).toEqual('Average weight: 6.0 kg');
  expect(getByAltText('Pikachu sprite').src).toEqual('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('2', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText('More details').href).toEqual('http://localhost/pokemons/25');
});

test('3', () => {
  const { getByText, history } = renderWithRouter(<App />);

  fireEvent.click(getByText('More details'));
  expect(history.location.pathname).toEqual('/pokemons/25');
});

test('4', () => {
  const { getByText, history } = renderWithRouter(<App />);

  pokemons.forEach(({ id }, index) => {
    const zero = 0;
    for (let i = zero; i < index; i += 1) {
      fireEvent.click(getByText('Próximo pokémon'));
    }
    fireEvent.click(getByText('More details'));
    expect(history.location.pathname).toEqual(`/pokemons/${id}`);
    fireEvent.click(getByText('Home'));
  });
});

test('5', () => {
  const { getByText, getByAltText, getByLabelText } = renderWithRouter(<App />);

  pokemons.forEach(({ name }, index) => {
    const zero = 0;
    for (let i = zero; i < index; i += 1) {
      fireEvent.click(getByText('Próximo pokémon'));
    }
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByLabelText('Pokémon favoritado?'));
    expect(getByAltText(`${name} is marked as favorite`).src).toEqual('http://localhost/star-icon.svg');
    fireEvent.click(getByText('Home'));
  });
});
