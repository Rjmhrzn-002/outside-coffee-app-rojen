import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabScreens from './BottomTabNavigation';
import OnboardScreen from '@screens/public/OnboardingScreen';
import ProductDetail from '@screens/auth/ProductDetail';
import {useAuthStore} from '@configs/useAppStore';

type RootStackParamList = {
  BottomTabs: any;
  Onboard: any;
  ProductDetail: {itemId: number};
};

const Stack = createStackNavigator<RootStackParamList>();

const publicScreen = [
  {
    name: 'Onboard',
    component: OnboardScreen,
    options: {headerShown: false, gestureEnabled: false},
  },
];

const authScreen = [
  {
    name: 'BottomTabs',
    component: BottomTabScreens,
    options: {headerShown: false},
  },
  {
    name: 'ProductDetail',
    component: ProductDetail,
    options: {headerShown: false},
  },
];

const AppStackNavigation: React.FC = () => {
  const {isAuthenticated, token} = useAuthStore();
  if (isAuthenticated === null) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'BottomTabs' : 'Onboard'}>
        {isAuthenticated && token
          ? authScreen.map(({name, component, options}) => (
              <Stack.Screen
                key={name}
                name={name as keyof RootStackParamList} // Type safes the name as we know it's a screen from our stack list
                component={component}
                options={options}
              />
            ))
          : publicScreen.map(({name, component, options}) => (
              <Stack.Screen
                key={name}
                name={name as keyof RootStackParamList} // Type safes the name as we know it's a screen from our stack list
                component={component}
                options={options}
              />
            ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStackNavigation;
