import React from 'react';
import {render, screen} from '@testing-library/react-native';
import '@testing-library/react-native/extend-expect';
import {Text} from 'react-native';

describe('App', () => {
  test('Says hi', async () => {
    render(<Text>Hello, world!</Text>);
    expect(screen.getByText('Hello, world!')).toBeOnTheScreen();
  });
});
