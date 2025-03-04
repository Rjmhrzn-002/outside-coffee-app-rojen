const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
const defaultConfig = getDefaultConfig(__dirname);
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve(
      'react-native-svg-transformer/react-native',
    ),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    sourceExts: ['js', 'jsx', 'ts', 'tsx', 'svg', 'json', 'cjs'],
    assetExts: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'tff'],
    extraNodeModules: {
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
};
module.exports = wrapWithReanimatedMetroConfig(
  mergeConfig(defaultConfig, config),
);
