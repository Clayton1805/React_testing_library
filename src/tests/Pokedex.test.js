import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

test('', () => {
  const { getByText } = renderWithRouter(<App />);

  const allPokemons = [...pokemons, ...pokemons];

  allPokemons.forEach(({ name }, index) => {
    const firstIndex = 0;
    if (index === firstIndex) {
      expect(getByText(name)).toBeInTheDocument();
    } else {
      fireEvent.click(getByText('Próximo pokémon'));
      expect(getByText(name)).toBeInTheDocument();
    }
  });
});

test('', () => {
  const { getAllByTestId } = renderWithRouter(<App />);

  expect(getAllByTestId('pokemon-name').length).toEqual(1);
});

test('', () => {
  const { getByText, getAllByTestId } = renderWithRouter(<App />);

  const allPokemonsTypes = pokemons.map((pokemon) => pokemon.type);
  const allTypes = allPokemonsTypes
    .filter((type, i) => allPokemonsTypes.indexOf(type) === i);

  allTypes.forEach((type) => {
    const buttonType = getAllByTestId('pokemon-type-button')
      .find((button) => button.innerHTML === type);
    expect(buttonType).toBeInTheDocument();
    fireEvent.click(buttonType);

    const pokemonsHaveType = pokemons.filter((pokemon) => pokemon.type === type);
    pokemonsHaveType.push(...pokemonsHaveType);
    pokemonsHaveType.forEach(({ name }, index) => {
      const firstIndex = 0;
      if (index === firstIndex) {
        expect(getByText(name)).toBeInTheDocument();
      } else {
        fireEvent.click(getByText('Próximo pokémon'));
        expect(getByText(name)).toBeInTheDocument();
      }
    });
  });
});

// test('', () => {
//   pokemons = jest.fn().mockReturnValue();
//   const { getByText, getAllByTestId } = renderWithRouter(<App />);
// });
// mock.mockClear();
