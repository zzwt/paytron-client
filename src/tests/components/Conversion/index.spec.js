import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Conversion from '../../../components/Conversion';

const fetchRate = jest.fn();
const conversionProps = {
  amount: 100,
  rate: { midMarketRate: 0.7186, currencyPair: 'AUDUSD' },
  from: 'AUD',
  to: 'USD',
  loading: false,
  fetchRate,
};

describe('Coversion', () => {
  // Fake timers using Jest
  beforeEach(() => {
    jest.useFakeTimers();
  });

  // Running all pending timers and switching to real timers using Jest
  afterEach(() => {
    jest.useRealTimers();
  });

  test('should not be displayed if rate is null', () => {
    render(<Conversion {...conversionProps} amount="A" />);
    expect(screen.queryByTestId('cover')).not.toBeInTheDocument();
  });

  test('should not be displayed if amount is NaN', () => {
    render(<Conversion {...conversionProps} rate={null} />);
    expect(screen.queryByTestId('cover')).not.toBeInTheDocument();
  });

  test('should not be displayed if loading', () => {
    render(<Conversion {...conversionProps} loading={true} />);
    expect(screen.getByTestId('cover')).toBeInTheDocument();
  });

  test('should display source currency amount', () => {
    render(<Conversion {...conversionProps} />);
    const source = screen.getByTestId('source');
    expect(source).toHaveTextContent('Converting');
    expect(source).toHaveTextContent('$100.00 AUD');
  });

  test('should display target currency amount', () => {
    render(<Conversion {...conversionProps} />);
    const target = screen.getByTestId('target');
    expect(target).toHaveTextContent("You'll");
    expect(target).toHaveTextContent('$71.50 USD');
  });

  test('should display base rate', () => {
    render(<Conversion {...conversionProps} />);
    const baseRate = screen.getByTestId('base-rate');
    expect(baseRate).toHaveTextContent('Base Rate');
    expect(baseRate).toHaveTextContent('$1 AUD = $0.7186 USD');
  });
  test('should display paytron fee', () => {
    render(<Conversion {...conversionProps} />);
    const fee = screen.getByTestId('fee');
    expect(fee).toHaveTextContent('Paytron Fee');
    expect(fee).toHaveTextContent('$0.36 USD');
  });
  test('should display paytron rate', () => {
    render(<Conversion {...conversionProps} />);
    const paytronRate = screen.getByTestId('paytron-rate');
    expect(paytronRate).toHaveTextContent('Paytron Rate');
    expect(paytronRate).toHaveTextContent('$1 AUD = $0.7150 USD');
  });

  test('fetchRate should be called', () => {
    render(<Conversion {...conversionProps} />);
    jest.advanceTimersByTime(30000);
    expect(fetchRate).toHaveBeenCalledTimes(1);
  });
});
