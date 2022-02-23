import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cover from '../../../components/Cover';

test('Cover display spinner', () => {
  render(<Cover />);
  expect(screen.getByRole('img')).toBeInTheDocument();
});
