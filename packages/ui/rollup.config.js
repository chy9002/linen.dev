const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const external = require('rollup-plugin-peer-deps-external');
const { visualizer } = require('rollup-plugin-visualizer');
const path = require('path');
const glob = require('glob');

const input = glob
  .sync(path.join(__dirname, 'src/**/*.tsx'))
  .filter((file) => !file.includes('.test.') && !file.includes('.spec.'));

module.exports = {
  input,
  output: {
    dir: 'dist',
    format: 'cjs',
    entryFileNames(chunk) {
      const file = chunk.facadeModuleId
        .replace(path.join(__dirname, 'src/'), '')
        .replace('index.tsx', '[name].js');
      return file;
    },
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    resolve(),
    postcss({
      extract: true,
      modules: true,
      use: ['sass'],
    }),
    commonjs(),
    external(),
    process.env.ANALYZE && visualizer(),
  ].filter(Boolean),
};
