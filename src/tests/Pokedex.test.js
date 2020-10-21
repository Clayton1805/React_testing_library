import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

test('', () => {
  const { getByText } = renderWithRouter(<App />);

  const namesAllPokemons = pokemons.map((pokemon) => pokemon.name);
  namesAllPokemons.push(...namesAllPokemons.slice(0, 5));
  namesAllPokemons.forEach((name, index) => {
    if (index === 0) {
      expect(getByText(name)).toBeInTheDocument();
    } else {
      fireEvent.click(getByText('Próximo pokémon'));
      expect(getByText(name)).toBeInTheDocument();
    }
  });
});
