import {defineConfig} from 'vitest/config';
import fs from 'fs';
import flow from 'esbuild-plugin-flow';
import path from 'path';

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
    alias: [
      {find: /^react-native\/(.*)/, replacement: 'react-native-web/$1'},
      {
        find: /^react-native$/,
        replacement: path.resolve(__dirname, 'vite', 'react-native-web.ts'),
      },
      {
        find: 'react-native-vector-icons/MaterialIcons',
        replacement: 'react-native-vector-icons/dist/MaterialIcons',
      },
      {
        find: 'react-native-vector-icons/MaterialCommunityIcons',
        replacement: 'react-native-vector-icons/dist/MaterialCommunityIcons',
      },
    ],
    environment: 'jsdom',
    server: {
      debug: {
        dumpModules: true,
      },
    },
    deps: {
      optimizer: {
        web: {
          include: ['react-native-elements/**/*.js'],
          extensions: allExtensions,
          esbuildOptions: {
            resolveExtensions: allExtensions,
            plugins: [
              {
                name: 'png',
                setup(build) {
                  build.onLoad({filter: /\.png$/}, async args => {
                    const source = await fs.promises.readFile(
                      args.path,
                      'utf8',
                    );
                    return {
                      contents: source,
                      loader: 'file',
                    };
                  });
                },
              },
              {
                name: 'json',
                setup(build) {
                  build.onLoad({filter: /\.json$/}, async args => {
                    const source = await fs.promises.readFile(
                      args.path,
                      'utf8',
                    );
                    return {
                      contents: source,
                      loader: 'json',
                    };
                  });
                },
              },
              flow(/node_modules/),
              {
                name: 'load-js-files-as-jsx',
                setup(build) {
                  build.onLoad(
                    {
                      filter:
                        /node_modules\/(?:react-native-reanimated|react-native-elements|react-native-ratings|react-native-vector-icons|react-native-actionsheet|react-native-actions-sheet)\/.*.js$/,
                    },
                    async args => {
                      const file = await fs.promises.readFile(
                        args.path,
                        'utf-8',
                      );
                      return {contents: file, loader: 'jsx'};
                    },
                  );
                },
              },
            ],
          },
        },
      },
    },
  },
});
