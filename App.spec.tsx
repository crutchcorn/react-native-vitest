import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import {App} from './App.tsx';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Text} from "react-native";
import {userEvent} from "@testing-library/user-event";

const Stack = createNativeStackNavigator();

const user = userEvent.setup()

function Test() {
  return <Text>Test</Text>
}

const renderApp = () => render(
  <NavigationContainer>
    <Stack.Navigator initialRouteName={"Home"}>
      <Stack.Screen name="Home" component={App} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  </NavigationContainer>
);

describe('App', () => {
  test('Says hi', async () => {
    renderApp();
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });

  test('Says bye', async () => {
    renderApp();
    expect(screen.getByText('Bye, world!')).toBeInTheDocument();
  });

  test("Navigates", async () => {
    renderApp();
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    user.click(screen.getByText("Click me"));
    expect(screen.getByText("Test")).toBeInTheDocument();
  })
});
