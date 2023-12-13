import {render, screen} from '@testing-library/react-native';
import {App} from './App.tsx';
import '@testing-library/react-native/extend-expect';

describe('App', () => {
  test('Says hi', async () => {
    render(<App />);
    expect(screen.getByText('Hello, world!')).toBeOnTheScreen();
  });
});
