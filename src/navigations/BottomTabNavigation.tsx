import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useColorScheme, View} from 'react-native';
import HomeScreen from '@screens/auth/HomeScreen';
import NotificationScreen from '@screens/auth/NotificationScreen';
import FavouriteScreen from '@screens/auth/FavouriteScreen';
import BagScreen from '@screens/auth/BagScreen';
import {PlatformPressable} from '@react-navigation/elements';

import HomeIcon from '@assets/icons/bottomTab/Home.svg';
import FavouriteIcon from '@assets/icons/bottomTab/Heart.svg';
import BagIcon from '@assets/icons/bottomTab/Bag.svg';
import NotificationIcon from '@assets/icons/bottomTab/Notification.svg';
import {BORDER_RADIUS, COLORS, SPACING} from '../Constants';

export type BottomStackList = {
  Home: undefined;
  Favourite: undefined;
  Bag: undefined;
  Notification: {itemId: number; otherParam?: string};
};

const Tab = createBottomTabNavigator<BottomStackList>();

const BottomTabNavigation = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // theme toggle objetc
  const theme = {
    background: isDarkMode ? COLORS.GRAY : COLORS.BACKGROUND,
    tabBar: isDarkMode ? COLORS.DARK_GRAY : COLORS.BACKGROUND,
    border: isDarkMode ? COLORS.DARK_GRAY : COLORS.OFF_WHITE,
    activeIcon: COLORS.PRIMARY,
  };

  // Define our tab screens
  const tabs = [
    {
      name: 'Home',
      component: HomeScreen,
      icon: HomeIcon,
    },
    {
      name: 'Favourite',
      component: FavouriteScreen,
      icon: FavouriteIcon,
    },
    {
      name: 'Bag',
      component: BagScreen,
      icon: BagIcon,
    },
    {
      name: 'Notification',
      component: NotificationScreen,
      icon: NotificationIcon,
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: theme.background}}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 60,
            backgroundColor: theme.tabBar,
            borderTopWidth: 2,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderTopRightRadius: BORDER_RADIUS.XL,
            borderTopLeftRadius: BORDER_RADIUS.XL,
            borderColor: theme.border,
            paddingTop: SPACING.XS,
          },
          tabBarButton: props => (
            <PlatformPressable
              {...props}
              android_ripple={{color: 'transparent'}}
              // This removes the default android behaviour which removes the press ripple effect.
            />
          ),
        }}>
        {tabs.map(({name, component, icon: Icon}) => (
          <Tab.Screen
            key={name}
            name={name as keyof BottomStackList}
            component={component}
            options={{
              tabBarIcon: () => <Icon width={24} height={24} />,
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigation;
