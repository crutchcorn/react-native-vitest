import {defineConfig} from 'vitest/config';

const defaultExtensions = [
  '.mjs',
  '.js',
  '.mts',
  '.ts',
  '.jsx',
  '.tsx',
  '.json',
];

const allExtensions = [
  ...defaultExtensions.map(ext => ext.replace(/^\./, '.web.')),
  ...defaultExtensions.map(ext => ext.replace(/^\./, '.browser.')),
  ...defaultExtensions.map(ext => ext.replace(/^\./, '.ios.')),
  ...defaultExtensions.map(ext => ext.replace(/^\./, '.android.')),
  ...defaultExtensions.map(ext => ext.replace(/^\./, '.native.')),
  ...defaultExtensions,
];

export default defineConfig({
  test: {
    globals: true,
    alias: {
      'react-native': 'react-native-web',
    },
    environment: 'jsdom',
    server: {
      debug: {
        dumpModules: true,
      },
      deps: {
        inline: [/@testing-library\/react-native/],
        external: [],
      },
    },
    deps: {
      web: {
        transformAssets: true,
        transformGlobPattern: /(?:react-native|@react-native)/,
      },
    },
  },
});
