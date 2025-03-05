import {Dimensions} from 'react-native';

// Screen Dimensions
export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
// Colors
export const COLORS = {
  PRIMARY: '#C67C4E',
  SECONDARY: '#2ecc71',
  TERTIARY: '#e74c3c',
  ACCENT: '#ED5151',
  BACKGROUND: '#F9F9F9',
  TEXT: '#989898',
  WHITE: '#ffffff',
  BLACK: '#000000',
  OFF_WHITE: '#F1F1F1',
  GREEN: '#2F4B4E',
  LIGHT_GRAY: '#808080',
  GRAY: '#313131',
  DARK_GRAY: '#131313',
  TRANSPARENT: 'transparent',
};

export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 16,
  LG: 24,
  XL: 32,
  XXL: 40,
};

// Font Sizes
export const FONT_SIZES = {
  XS: 10,
  SM: 12,
  MD: 14,
  BASE: 16,
  LG: 18,
  XL: 20,
  XXL: 24,
  XXXL: 28,
};

// Border Radius
export const BORDER_RADIUS = {
  XS: 4,
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 24,
  ROUND: 9999,
};

// Fonts
export const FONTS = {
  FAMILY: {
    REGULAR: 'System',
    BOLD: 'System-Bold',
    ITALIC: 'System-Italic',
  },
  WEIGHT: {
    THIN: '100',
    LIGHT: '300',
    REGULAR: '400',
    MEDIUM: '500',
    SEMI_BOLD: '600',
    BOLD: '700',
    EXTRA_BOLD: '800',
    BLACK: '900',
  },
};
