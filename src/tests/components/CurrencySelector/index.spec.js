import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CurrencySelector from '../../../components/CurrencySelector';

test('CurrencySelector should display title', () => {
  render(<CurrencySelector title="From" />);
  expect(screen.getByText('From')).toBeInTheDocument();
});

test('CurrencySelector should display currency passed in correctly', () => {
  render(<CurrencySelector value="AUD" />);
  expect(screen.getByText('AUD - Australian Dollar')).toBeInTheDocument();
});

test('onValueChange should be called when curreny is selected', async () => {
  const onValueChange = jest.fn();
  render(<CurrencySelector value="AUD" onValueChange={onValueChange} />);

  const input = screen.getByRole('combobox');
  fireEvent.mouseDown(input);

  const option = screen.getByTestId('EUR');
  fireEvent.click(option);
  expect(onValueChange).toHaveBeenCalledWith('EUR', expect.anything());
});
