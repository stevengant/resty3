import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Header from '.';

describe('Header Component', () => {
  it('renders a header element', () => {
    render(<Header />);
    const header = screen.getAllByTestId('header');

    expect(header).toBeTruthy();
    // expect(header).toBeInTheDocument();
  });

  it('renders h1 element as expected', () => {
    render(<Header />);
    const h1 = screen.getByText('RESTy');
    expect(h1).toBeInTheDocument();
  });
  
});
