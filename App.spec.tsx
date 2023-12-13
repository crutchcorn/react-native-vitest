import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import {App} from './App.tsx';

describe('App', () => {
  test('Says hi', async () => {
    render(<App />);
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });
});
