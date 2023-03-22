import React from 'react';
import { render, screen } from '@testing-library/react';
import Results from './';

describe('Results', () => {
  test('Renders props data', () => {
    const data = { name: 'Charmander', height: 6 };
    render(<Results data={data} />);
    const resultsText = screen.getByText('Charmander');
    expect(resultsText).toBeInTheDocument();
  });
})