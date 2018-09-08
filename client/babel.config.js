module.exports = {
  env: {
    test: {
      plugins: ['dynamic-import-node'],
      presets: [
        ['@babel/preset-env', {
          modules: 'commonjs',
          useBuiltIns: 'usage',
        }],
      ],
    },
  },
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    ['module-resolver', {
      alias: {
        spec: './spec',
      },
      root: ['./src'],
    }],
  ],
  presets: [
    '@babel/preset-react',
    ['@babel/preset-env', {
      modules: false,
      useBuiltIns: 'usage',
    }],
  ],
};
