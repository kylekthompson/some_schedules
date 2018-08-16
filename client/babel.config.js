module.exports = {
  env: {
    test: {
      plugins: ['dynamic-import-node'],
      presets: [
        ['@babel/preset-env', {
          useBuiltIns: 'usage',
          modules: 'commonjs',
        }],
      ],
    },
  },
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    ['module-resolver', {
      root: ['.'],
      alias: {
        src: './src',
        spec: './spec',
      },
    }],
  ],
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      modules: false,
    }],
  ],
};
