/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/AgreementScreen';
import SignIn from './src/screens/SignIn';
import Country from './src/screens/CountryList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
        screenListeners={{
          state: (e) => {
            // Do something with the state
            console.log('state changed', e.data);
          },
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Country"
          component={Country}
          options={{
            headerShown: false,
          }}
          detachPreviousScreen={true}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
