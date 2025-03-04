module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@screens': './src/screens',
          '@components': './src/components',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@navigations': './src/navigations',
          '@hooks': './src/hooks',
          '@configs': './src/configs',
          '@type': './src/types',
        },
      },
    ],

    'react-native-reanimated/plugin',
  ],
};
