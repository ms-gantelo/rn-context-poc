import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { List, Item } from './components';
import { GlobalProvider } from './store/GlobalState';
import { getDeps } from './store/dependencies';

const { Screen, Navigator } = createStackNavigator();

export const AppRoot = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <GlobalProvider deps={getDeps()}>
        <NavigationContainer>
          <Navigator>
            <Screen name="Home" component={List} />
            <Screen name="Artist" component={Item} />
          </Navigator>
        </NavigationContainer>
      </GlobalProvider>
    </>
  );
};
