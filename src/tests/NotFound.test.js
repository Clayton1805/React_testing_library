import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

test('oi', () => {
  const { getByText } = render(<NotFound />);
  expect(getByText('Page requested not found')).toBeInTheDocument();
});

test('tchal', () => {
  const { getByAltText } = render(<NotFound />);
  const image = getByAltText('Pikachu crying because the page'
  + ' requested was not found');
  expect(image).toBeInTheDocument();
});
