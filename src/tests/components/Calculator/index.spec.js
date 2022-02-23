import React from 'react';
import { render, screen, fireEvent, getByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator from '../../../components/Calculator';
import userEvent from '@testing-library/user-event';

test('Calculator should display amount, from, to', () => {
  render(<Calculator />);
  expect(screen.getByText('Amount')).toBeInTheDocument();
  expect(screen.getByText('From')).toBeInTheDocument();
  expect(screen.getByText('To')).toBeInTheDocument();
});

test('Calculator can swap From and To currency', () => {
  render(<Calculator />);
  const selectors = screen.getAllByTestId('selector');
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const from = getByText(selectors[0], /^\w+\s-\s[\s\w]+$/i).textContent;
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const to = getByText(selectors[1], /^\w+\s-\s[\s\w]+$/i).textContent;
  fireEvent.click(screen.getByTestId('swap'));

  const afterSelectors = screen.getAllByTestId('selector');

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const afterFrom = getByText(
    afterSelectors[0],
    /^\w+\s-\s[\s\w]+$/i
  ).textContent;
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const afterTo = getByText(
    afterSelectors[1],
    /^\w+\s-\s[\s\w]+$/i
  ).textContent;

  expect(afterFrom).toBe(to);
  expect(afterTo).toBe(from);
});

test('Amount should display correct symbol', () => {
  render(<Calculator />);
  const amount = screen.getByTestId('amount');
  // eslint-disable-next-line testing-library/no-node-access
  expect(amount.previousElementSibling.innerHTML).toBe('$');

  const currency = screen.getAllByRole('combobox')[0];
  fireEvent.mouseDown(currency);
  const option = screen.getByTestId('EUR');
  fireEvent.click(option);
  // eslint-disable-next-line testing-library/no-node-access
  expect(amount.previousElementSibling.innerHTML).toBe('€');
});

test('Calculator should display Calculate botton', async () => {
  render(<Calculator />);
  expect(screen.getByRole('button')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('swap'));
});

test('Calculate btn should be disabled if amount is invalid', async () => {
  render(<Calculator />);
  const amount = screen.getByTestId('amount');
  const user = userEvent.setup();
  await user.click(amount);
  await user.keyboard('{HOME}-');
  expect(screen.getByRole('button')).toHaveAttribute('disabled');
});
