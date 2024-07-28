module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
          '.png',
        ],
        alias: {
          assets: './src/assets',
          components: './src/components',
          configs: './src/configs',
          router: './src/router',
          screens: './src/screens',
          theme: './src/theme',
          types: './src/types',
          helpers: './src/helpers',
          // constants: './src/constants',
          // hooks: './src/hooks',
          // store: './src/store',
          // utils: './src/utils',
        },
      },
    ],
  ],
};
