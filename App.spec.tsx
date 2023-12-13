import {render} from '@testing-library/react-native';
import {App} from './App.tsx';
import '@testing-library/react-native/extend-expect';

describe('App', () => {
  test('Says hi', async () => {
    const {getByText} = render(<App />);
    expect(getByText('Hello, world!')).toBeOnTheScreen();
  });
});
