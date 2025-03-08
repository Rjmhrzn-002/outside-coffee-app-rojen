import React, {useEffect} from 'react';
import {Appearance, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppStackNavigation from '@navigations/AppStackNavigation';
import {useThemeStore} from '@configs/useAppStore';

const App = () => {
  const updateTheme = useThemeStore(state => state.updateTheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      updateTheme(colorScheme ?? null);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppStackNavigation />
    </GestureHandlerRootView>
  );
};

export default App;
