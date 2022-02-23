import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Amount from '../../../components/Amount';

test('Amount should display "Amount" as title by default', () => {
  render(<Amount />);
  expect(screen.getByText('Amount')).not.toBeEmptyDOMElement();
});
test('Amount should display custom title', () => {
  render(<Amount title="Custom Title" />);
  expect(screen.getByText('Custom Title')).not.toBeEmptyDOMElement();
});
test('Amount should display corrent currency symbol', () => {
  render(<Amount prefix="£" />);
  expect(screen.getByText('£')).not.toBeEmptyDOMElement();
});
test('Amount should display correct amount', () => {
  render(<Amount amount={121.23} />);
  expect(screen.getByTestId('amount')).toHaveValue('121.23');
});
test('Amount should display correct amount with delimiter', () => {
  render(<Amount amount={12231231.23} />);
  expect(screen.getByTestId('amount')).toHaveValue('12,231,231.23');
});

test('Change amount to a negative value should display error message', () => {
  render(<Amount amount={100} />);
  fireEvent.input(screen.getByTestId('amount'), { target: { value: -10 } });
  expect(screen.getByTestId('amount')).toHaveValue('-10');
  expect(screen.getByTestId('error')).not.toBeEmptyDOMElement();
});

test('Change amount to be greater than 9007199254740991 should 1.00', () => {
  render(<Amount amount={100} />);
  fireEvent.input(screen.getByTestId('amount'), {
    target: { value: 9007199254740992 },
  });
  fireEvent.blur(screen.getByTestId('amount'));
  expect(screen.getByTestId('amount')).toHaveValue('1.00');
});

test('Change amount to an invalid number should display error', () => {
  render(<Amount amount={100} />);
  fireEvent.input(screen.getByTestId('amount'), { target: { value: 'asdf' } });
  expect(screen.getByTestId('error')).not.toBeEmptyDOMElement();
});

test('Change amount should display value that returned by parseFloat', () => {
  render(<Amount amount={100} />);
  fireEvent.input(screen.getByTestId('amount'), { target: { value: '1a.0' } });
  fireEvent.blur(screen.getByTestId('amount'));
  expect(screen.getByTestId('amount')).toHaveValue('1.00');
});

test('Type valid amount should update text value', () => {
  render(<Amount amount={100} />);
  fireEvent.input(screen.getByTestId('amount'), {
    target: { value: '21213.481' },
  });
  fireEvent.blur(screen.getByTestId('amount'));
  expect(screen.getByTestId('amount')).toHaveValue('21,213.48');
});

test('Type valid amount from invalid amount should remove error message', () => {
  render(<Amount amount={100} />);
  fireEvent.input(screen.getByTestId('amount'), {
    target: { value: '-1' },
  });
  screen.getByTestId('amount').blur();
  expect(screen.getByTestId('error')).not.toBeEmptyDOMElement();
  fireEvent.input(screen.getByTestId('amount'), {
    target: { value: '1' },
  });
  screen.getByTestId('amount').blur();
  expect(screen.queryByTestId('error')).toBeNull();
});

test('onValueChange should be call with correct valid amount returned', () => {
  const onValueChange = jest.fn();
  render(<Amount amount={100} onValueChange={onValueChange} />);
  fireEvent.input(screen.getByTestId('amount'), {
    target: { value: 345 },
  });
  expect(onValueChange).toHaveBeenCalledWith(345);
});

test('onValueChange should be returned with null if invalid amount entered', () => {
  const onValueChange = jest.fn();
  render(<Amount amount={100} onValueChange={onValueChange} />);
  fireEvent.input(screen.getByTestId('amount'), {
    target: { value: -10 },
  });
  expect(onValueChange).toHaveBeenCalledWith(null);
});
