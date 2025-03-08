import React from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';
import {COLORS} from '../../Constants';

type FontWeight =
  | 'THIN'
  | 'EXTRA_LIGHT'
  | 'LIGHT'
  | 'REGULAR'
  | 'MEDIUM'
  | 'SEMI_BOLD'
  | 'BOLD'
  | 'EXTRA_BOLD';

// Extend TextProps to include our custom fontWeight prop
interface CustomTextProps extends TextProps {
  weight?: FontWeight;
}

const CustomText: React.FC<CustomTextProps> = ({
  style,
  weight = 'REGULAR',
  children,
  ...props
}) => {
  const getFontFamily = (weight: FontWeight): string => {
    switch (weight) {
      case 'THIN':
        return 'Sora-Thin';
      case 'EXTRA_LIGHT':
        return 'Sora-ExtraLight';
      case 'LIGHT':
        return 'Sora-Light';
      case 'MEDIUM':
        return 'Sora-Medium';
      case 'SEMI_BOLD':
        return 'Sora-SemiBold';
      case 'BOLD':
        return 'Sora-Bold';
      case 'EXTRA_BOLD':
        return 'Sora-ExtraBold';
      case 'REGULAR':
      default:
        return 'Sora-Regular';
    }
  };

  return (
    <Text
      style={[styles.defaultText, {fontFamily: getFontFamily(weight)}, style]}
      {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 16,
    color: COLORS.TEXT,
  },
});

export default CustomText;
