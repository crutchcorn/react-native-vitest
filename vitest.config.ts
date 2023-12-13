import {defineConfig} from 'vitest/config';
import flow from 'esbuild-plugin-flow';
import * as fs from 'fs';

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

export default defineConfig({
  test: {
    globals: true,
    deps: {
      web: {
        transformAssets: true,
      },
      optimizer: {
        web: {
          include: ['react-native'],
          esbuildOptions: {
            plugins: [
              flow(/node_modules\/.*\.jsx?/),
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
            ],
            resolveExtensions: allExtensions,
          },
        },
      },
    },
  },
});
