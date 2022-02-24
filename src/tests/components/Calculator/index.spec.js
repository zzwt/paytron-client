import React from 'react';
import { render, screen, getByText, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Calculator } from '../../../components';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
jest.mock('axios');

describe('Calculator', () => {
  test('should display amount, from, to', () => {
    render(<Calculator />);
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('From')).toBeInTheDocument();
    expect(screen.getByText('To')).toBeInTheDocument();
  });

  test('can swap From and To currency', () => {
    render(<Calculator />);
    const selectors = screen.getAllByTestId('selector');
    const regExp = /^\w+\s-\s[\s\w]+$/i;
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const from = getByText(selectors[0], regExp).textContent;
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const to = getByText(selectors[1], regExp).textContent;
    fireEvent.click(screen.getByTestId('swap'));

    const afterSelectors = screen.getAllByTestId('selector');

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const afterFrom = getByText(afterSelectors[0], regExp).textContent;
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const afterTo = getByText(afterSelectors[1], regExp).textContent;

    expect(afterFrom).toBe(to);
    expect(afterTo).toBe(from);
  });

  test('should display correct symbol', () => {
    render(<Calculator />);
    const amountContainer = screen.getByTestId('amount-container');
    expect(amountContainer).toHaveTextContent('$');

    const currency = screen.getAllByRole('combobox')[0];
    fireEvent.mouseDown(currency);
    const option = screen.getByTestId('EUR');
    fireEvent.click(option);
    expect(amountContainer).toHaveTextContent('€');
  });

  test('should display Calculate botton', async () => {
    render(<Calculator />);
    expect(
      screen.getByRole('button', { name: 'Calculate' })
    ).toBeInTheDocument();
  });

  test('calculate btn should be disabled if amount is invalid', async () => {
    render(<Calculator />);
    const amount = screen.getByTestId('amount');
    const user = userEvent.setup();
    await user.click(amount);
    await user.keyboard('{HOME}-');
    expect(screen.getByRole('button')).toHaveAttribute('disabled');
  });

  describe('calculate rate', () => {
    beforeEach(() => {
      axios.get.mockReset();
    });

    test('Conversion result should be displayed if rate is fetched successfully', async () => {
      axios.get.mockResolvedValue({
        data: {
          currencyPair: 'AUD',
          midMarketRate: 0.72,
        },
      });
      render(<Calculator />);
      const calculateBtn = screen.getByRole('button', { name: 'Calculate' });
      const user = userEvent.setup();
      await user.click(calculateBtn);
      const conversion = screen.getByTestId('conversion');
      expect(conversion).toBeInTheDocument();
    });

    test('Error should be displayed if fetching rate is unsuccessfully', async () => {
      axios.get.mockResolvedValue({
        data: {},
      });
      render(<Calculator />);
      const calculateBtn = screen.getByRole('button', { name: 'Calculate' });
      const user = userEvent.setup();
      await user.click(calculateBtn);
      const conversion = screen.queryByTestId('conversion');
      expect(conversion).not.toBeInTheDocument();
      expect(screen.getByTestId('fetch-error')).toBeInTheDocument();
    });
  });
});
