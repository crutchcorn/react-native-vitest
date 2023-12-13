import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  Text as RNText,
} from 'react-native';
import {Text} from 'react-native-elements';
import styled from 'styled-components/native';

const RedText = styled(RNText)`
  color: red;
`;

const Test = () => {
  return <RedText>Bye, world!</RedText>;
};

export function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView>
        <Test />
        <Text h1>Hello, world!</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
