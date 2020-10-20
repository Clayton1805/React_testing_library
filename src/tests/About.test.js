import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

test('se o texto "About Pokédex" é renderizado na tela', () => {
  const { getByText } = render(<About />);
  expect(getByText('About Pokédex')).toBeInTheDocument();
});

test('se o 1° paragrafo de About é renderizado na tela', () => {
  const { getByText } = render(<About />);
  const ola = getByText(
    'This application simulates a Pokédex, '
    + 'a digital encliclopedia containing all Pokémons',
  );
  expect(ola).toBeInTheDocument();
});

test('se o 2° paragrafo de About é renderizado na tela', () => {
  const { getByText } = render(<About />);
  const ola = getByText(
    'One can filter Pokémons by type, '
    + 'and see more details for each one of them',
  );
  expect(ola).toBeInTheDocument();
});

test('se imagem da pokedex é renderizada', () => {
  const { getByAltText } = render(<About />);
  const ola = getByAltText('Pokédex');
  expect(ola.src).toEqual('https://cdn.bulbagarden.net/upload/thumb/8/86/'
  + 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
