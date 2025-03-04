import {Dimensions} from 'react-native';

// Screen Dimensions
export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
// Colors
export const COLORS = {
  PRIMARY: '#3498db',
  SECONDARY: '#2ecc71',
  TERTIARY: '#e74c3c',
  BACKGROUND: '#ffffff',
  TEXT: '#333333',
  WHITE: '#ffffff',
  BLACK: '#000000',
  GRAY: '#808080',
  LIGHT_GRAY: '#f0f0f0',
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
  XL: 20,
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
