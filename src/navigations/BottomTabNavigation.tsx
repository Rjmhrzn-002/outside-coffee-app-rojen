import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/auth/HomeScreen';
import NotificationScreen from '@screens/auth/NotificationScreen';
import FavouriteScreen from '@screens/auth/FavouriteScreen';
import BagScreen from '@screens/auth/BagScreen';

export type BottomStackList = {
  Home: undefined;
  Favourite: undefined;
  Bag: undefined;
  Notification: {itemId: number; otherParam?: string};
};

const Tab = createBottomTabNavigator<BottomStackList>();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
      <Tab.Screen name="Bag" component={BagScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;

// screenOptions={({route}) => ({
//   tabBarIcon: ({focused, color, size}) => {
//     switch (route.name) {
//       case 'Home':
//         return focused ? <ActiveHomeIcon /> : <InactiveHomeIcon />;
//       case 'Favourite':
//         return focused ? (
//           <ActiveFavouriteIcon />
//         ) : (
//           <InactiveFavouriteIcon />
//         );
//       case 'Bag':
//         return focused ? <ActiveBagIcon /> : <InactiveBagIcon />;
//       case 'Notification':
//         return focused ? (
//           <ActiveNotificationIcon />
//         ) : (
//           <InactiveNotificationIcon />
//         );
//       default:
//         return null;
//     }
//   },
//   tabBarActiveTintColor: '#5932A1',
//   tabBarInactiveTintColor: '#CCCCCC',
//   tabBarStyle: {height: 60},
//   tabBarPressColor: 'red',
//   tabBarAllowFontScaling: true,
//   tabBarHideOnKeyboard: true,
//   tabBarLabelStyle: {
//     fontSize: 13,
//   },
//   headerShown: false,
// })}
