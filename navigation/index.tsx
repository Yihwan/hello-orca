/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import Whirlpools from '../screens/Whirlpools';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    // @ts-ignore TODO fix type issue: https://stackoverflow.com/questions/71816116/stack-navigator-cannot-be-used-as-a-jsx-component
    <Stack.Navigator>
      <Stack.Screen name="Whirlpools" component={Whirlpools} />
    </Stack.Navigator>
  );
}
