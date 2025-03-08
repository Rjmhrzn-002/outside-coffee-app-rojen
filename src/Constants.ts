import {Dimensions} from 'react-native';

// Screen Dimensions
export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

const BASE_UNIT = SCREEN_WIDTH * 0.04;

export const SPACING = {
  XS: BASE_UNIT * 0.25,
  SM: BASE_UNIT * 0.5,
  MD: BASE_UNIT,
  LG: BASE_UNIT * 1.5,
  XL: BASE_UNIT * 2,
  XXL: BASE_UNIT * 2.5,
};

// Font Sizes
export const FONT_SIZES = {
  XS: SCREEN_WIDTH * 0.025,
  SM: SCREEN_WIDTH * 0.03,
  MD: SCREEN_WIDTH * 0.035,
  BASE: SCREEN_WIDTH * 0.04,
  LG: SCREEN_WIDTH * 0.045,
  XL: SCREEN_WIDTH * 0.05,
  XXL: SCREEN_WIDTH * 0.06,
  XXXL: SCREEN_WIDTH * 0.07,
};

// Border Radius
export const BORDER_RADIUS = {
  XS: SCREEN_WIDTH * 0.01,
  SM: SCREEN_WIDTH * 0.02,
  MD: SCREEN_WIDTH * 0.03,
  LG: SCREEN_WIDTH * 0.04,
  XL: SCREEN_WIDTH * 0.06,
  ROUND: 9999,
};

export const responsiveWidth = (percentage: number) => {
  return SCREEN_WIDTH * (percentage / 100);
};

export const responsiveHeight = (percentage: number) => {
  return SCREEN_HEIGHT * (percentage / 100);
};

// Colors
export const COLORS = {
  PRIMARY: '#C67C4E',
  PRIMARY_SOFT: '#FFF5EE',
  ACCENT: '#ED5151',
  BACKGROUND: '#F9F9F9',
  WHITE: '#ffffff',
  OFF_WHITE: '#F1F1F1',
  TEXT: '#989898',
  BLACK: '#000000',
  GREEN: '#2F4B4E',
  LIGHT_GRAY: '#808080',
  GRAY: '#313131',
  DARK_GRAY: '#131313',
  TRANSPARENT: 'transparent',
};

// Fonts
export const FONTS = {
  FAMILY: {
    REGULAR: 'System',
    BOLD: 'System-Bold',
    ITALIC: 'System-Italic',
  },
};

// Custom sora fonts
export const CUSTOM_FONT = {
  FAMILY: {
    THIN: 'Sora-Thin',
    EXTRA_LIGHT: 'Sora-ExtraLight',
    LIGHT: 'Sora-Light',
    REGULAR: 'Sora-Regular',
    MEDIUM: 'Sora-Medium',
    SEMI_BOLD: 'Sora-SemiBold',
    BOLD: 'Sora-Bold',
    EXTRA_BOLD: 'Sora-ExtraBold',
  },
};

// Size differenciate values
export const isSmallDevice = SCREEN_WIDTH < 375;
export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 768;
export const isLargeDevice = SCREEN_WIDTH >= 768;
