import React from 'react';
import {useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppStackNavigation from '@navigations/AppStackNavigation';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppStackNavigation />
    </GestureHandlerRootView>
  );
};

export default App;
