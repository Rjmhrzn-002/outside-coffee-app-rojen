import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import CustomText from '@components/global/CustomText';
import {COLORS, SPACING} from '../../Constants';
import ScreenHeader from '@components/global/ScreenHeader';

const NotificationScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {backgroundColor: isDarkMode ? COLORS.GRAY : COLORS.BACKGROUND},
      ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <ScreenHeader>
        <CustomText
          weight="SEMI_BOLD"
          style={[styles.headerText, isDarkMode && {color: COLORS.TEXT}]}>
          NOTIFICATION
        </CustomText>
      </ScreenHeader>
      <View
        style={[
          styles.container,
          {backgroundColor: isDarkMode ? COLORS.GRAY : '#f8f8f8'},
        ]}>
        <CustomText
          weight="BOLD"
          style={[styles.title, isDarkMode && {color: COLORS.TEXT}]}>
          Under Construction !!
        </CustomText>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    color: COLORS.DARK_GRAY,
    marginTop: SPACING.XXL,
    marginHorizontal: SPACING.LG,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: SPACING.MD,
  },
});

export default NotificationScreen;
