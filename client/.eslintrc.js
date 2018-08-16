module.exports = {
  parser: 'babel-eslint',
  parserOptions: { sourceType: 'module' },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:jest/recommended'],
  rules: {
    'arrow-parens': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'eqeqeq': ['error', 'always', { null: 'ignore' }],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: '16.4.2',
    },
  },
};
