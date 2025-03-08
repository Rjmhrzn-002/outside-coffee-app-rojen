import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS, SPACING} from '../../Constants';

interface ScreenHeaderProps {
  children: React.ReactNode;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({children}) => {
  return <View style={styles.header}>{children}</View>;
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    width: '100%',
  },
});

export default ScreenHeader;
