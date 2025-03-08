import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabScreens from './BottomTabNavigation';
import OnboardScreen from '@screens/public/OnboardingScreen';
import ProductDetail from '@screens/auth/ProductDetail';
import {useAuthStore} from '@configs/useAppStore';
import {ICoffee} from '@type/app.type';

export type RootStackParamList = {
  BottomTabs: any;
  Onboard: any;
  ProductDetail: {item: ICoffee};
};

// Type safes the name as we know it's a screen from our stack list
type RouteConfig = {
  name: keyof RootStackParamList;
  component: any;
  options: {};
};

const Stack = createStackNavigator<RootStackParamList>();

const publicScreen: RouteConfig[] = [
  {
    name: 'Onboard',
    component: OnboardScreen,
    options: {headerShown: false, gestureEnabled: false},
  },
];

const authScreen: RouteConfig[] = [
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
                name={name}
                component={component}
                options={options}
              />
            ))
          : publicScreen.map(({name, component, options}) => (
              <Stack.Screen
                key={name}
                name={name}
                component={component}
                options={options}
              />
            ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStackNavigation;
