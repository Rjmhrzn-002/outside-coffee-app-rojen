import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabScreens from './BottomTabNavigation';
import OnboardScreen from '@screens/public/OnboardingScreen';

type RootStackParamList = {
  BottomTabs: any;
  Onboard: any;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppStackNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboard">
        <Stack.Screen
          name="Onboard"
          component={OnboardScreen}
          options={() => ({
            headerShown: false,
          })}
        />
        <Stack.Screen name="BottomTabs" component={BottomTabScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStackNavigation;
