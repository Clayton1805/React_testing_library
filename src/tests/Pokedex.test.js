import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

test('se o titulo da pokedex aparece', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

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

test('', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);

  fireEvent.click(getByText('Bug'));

  const buttonAll = getByTestId('all-pokemon-button');
  expect(buttonAll.innerHTML).toEqual('All');
  fireEvent.click(buttonAll);

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
  const backUpPokemons = [...pokemons];
  // console.log(backUpPokemons);
  pokemons[0].type = 'jose';
  pokemons[1].type = 'qualquer1';
  const dois = 2;
  pokemons.splice(dois, pokemons.length);
  // console.log(backUpPokemons);

  // console.log(pokemons);

  const { getAllByTestId } = renderWithRouter(<App />);

  const buttonType = getAllByTestId('pokemon-type-button');
  expect(buttonType[0].innerHTML).toEqual('jose');
  expect(buttonType[1].innerHTML).toEqual('qualquer1');

  pokemons[0].type = 'Electric';
  pokemons[1].type = 'Fire';
  const zero = 0;
  pokemons.splice(zero, pokemons.length);
  // console.log(pokemons);
  // console.log(backUpPokemons);
  pokemons.push(...backUpPokemons);
});

test('oiiiiiiii', () => {
  const { getByText } = renderWithRouter(<App />);

  expect(getByText('Próximo pokémon').disabled).toEqual(false);
  fireEvent.click(getByText('Bug'));
  expect(getByText('Próximo pokémon').disabled).toEqual(true);
  fireEvent.click(getByText('Fire'));
  expect(getByText('Próximo pokémon').disabled).toEqual(false);
  fireEvent.click(getByText('Poison'));
  expect(getByText('Próximo pokémon').disabled).toEqual(true);
});
