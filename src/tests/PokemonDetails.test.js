import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
// import pokemons from '../data';

test('1', () => {
  const { getByText, queryByText } = renderWithRouter(<App />);
  // fazer um mock da requisição de mais detalhes cujo link é dado no obj

  fireEvent.click(getByText('More details'));

  expect(getByText('Pikachu Details')).toBeInTheDocument();
  expect(queryByText('More details')).toBeNull();
  expect(getByText('Summary')).toBeInTheDocument();
  // expect(getByText()).toBeInTheDocument();

  fireEvent.click(getByText('Home'));
});
