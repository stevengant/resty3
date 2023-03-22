import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import Form from ".";

describe('Form', () => {
  it('handles submit with mock data', () => {
    const mockApiCall = jest.fn();
    render(<Form handleApiCall={mockApiCall} />);
    const userInput = screen.getByLabelText('URL');
    const submitButton = screen.getByLabelText('GO!');

    fireEvent.change(userInput, { target: {value: 'https://pokeapi.co/api/v2/pokemon/bulbasaur'} });
    fireEvent.click(submitButton);

    expect(mockApiCall).toHaveBeenCalledWith({
      method: 'GET',
      url: "https://pokeapi.co/api/v2/pokemon",
    });
  });
});