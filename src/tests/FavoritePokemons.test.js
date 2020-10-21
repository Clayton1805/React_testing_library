import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

beforeEach(() => {
  localStorage.clear();
});

test('se o texto correto é mostrado ao não se adicionar pokemons aos favoritos', () => {
  const { getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText('Favorite Pokémons'));
  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});

function saveFavoritePokemon(getByText, getByLabelText) {
  fireEvent.click(getByText('More details'));
  fireEvent.click(getByLabelText('Pokémon favoritado?'));
  fireEvent.click(getByText('Home'));
}

test('se add to favourites um pokemon ele deve aparecer na URL /favorites', () => {
  const { getByText, getByLabelText, getByTestId } = renderWithRouter(<App />);
  const saveNamePokemon = [];
  saveNamePokemon.push(getByTestId('pokemon-name').innerHTML);
  saveFavoritePokemon(getByText, getByLabelText);
  fireEvent.click(getByText('Próximo pokémon'));
  saveNamePokemon.push(getByTestId('pokemon-name').innerHTML);
  saveFavoritePokemon(getByText, getByLabelText);

  fireEvent.click(getByText('Favorite Pokémons'));

  saveNamePokemon.forEach((name) => {
    expect(getByText(name)).toBeInTheDocument();
  });
  // console.log(localStorage.getItem('favoritePokemonIds'));

});

// console.log(localStorage.getItem('favoritePokemonIds'));
test('os pokemons não add to favourites não devem ser renderizados no favorites', () => {
  const {
    getByText,
    getByLabelText,
    getByTestId,
    queryByText,
  } = renderWithRouter(<App />);
  const saveNamePokemon = [];
  fireEvent.click(getByText('Próximo pokémon'));
  saveNamePokemon.push(getByTestId('pokemon-name').innerHTML);
  saveFavoritePokemon(getByText, getByLabelText);
  fireEvent.click(getByText('Próximo pokémon'));
  fireEvent.click(getByText('Próximo pokémon'));
  saveNamePokemon.push(getByTestId('pokemon-name').innerHTML);
  saveFavoritePokemon(getByText, getByLabelText);

  fireEvent.click(getByText('Favorite Pokémons'));
  const arrayNamesNotSave = pokemons.map((pokemon) => pokemon.name)
    .filter((name1) => !saveNamePokemon.some((name2) => name1 === name2));
  arrayNamesNotSave.forEach((name) => {
    expect(queryByText(name)).toBeNull();
  });
});
