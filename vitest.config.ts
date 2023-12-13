import {defineConfig} from 'vitest/config';
import flow from 'esbuild-plugin-flow';
import * as fs from 'fs';
import {DepsOptimizationOptions} from 'vitest';

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
  ...defaultExtensions.map(ext => ext.replace(/^\./, '.ios.')),
  ...defaultExtensions.map(ext => ext.replace(/^\./, '.android.')),
  ...defaultExtensions.map(ext => ext.replace(/^\./, '.native.')),
  ...defaultExtensions,
];

const optimizerDeps: DepsOptimizationOptions = {
  include: ['react-native/**/*.js', 'react-native/**/*.jsx'],
  extensions: allExtensions,
  enabled: true,
  esbuildOptions: {
    plugins: [
      flow(/(?:react-native|@react-native)\/.*\.jsx?/, true),
      {
        name: 'png',
        setup(build) {
          build.onLoad({filter: /\.png$/}, async args => {
            const source = await fs.promises.readFile(args.path, 'utf8');
            return {
              contents: source,
              loader: 'file',
            };
          });
        },
      },
    ],
    resolveExtensions: allExtensions,
  },
};

export default defineConfig({
  test: {
    globals: true,
    server: {
      debug: {
        dumpModules: true,
      },
      deps: {
        inline: [
          /react-native/,
          /@react-native/,
          /@testing-library\/react-native/,
        ],
        external: [],
      },
    },
    deps: {
      web: {
        transformAssets: true,
        transformGlobPattern: /(?:react-native|@react-native)/,
      },
      optimizer: {
        web: optimizerDeps,
        ssr: optimizerDeps,
      },
    },
  },
});
