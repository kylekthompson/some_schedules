module.exports = {
  parser: 'babel-eslint',
  parserOptions: { sourceType: 'module' },
  plugins: ['sort-imports-es6-autofix'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:jest/recommended'],
  rules: {
    'arrow-parens': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/jsx-sort-props': ['error', {
      callbacksLast: false,
      shorthandFirst: true,
      ignoreCase: false,
      noSortAlphabetically: false,
      reservedFirst: true,
    }],
    'react/sort-prop-types': ['error', {
      callbacksLast: false,
      ignoreCase: false,
      requiredFirst: false,
      sortShapeProp: true,
      noSortAlphabetically: false,
    }],
    'sort-keys': ['error', 'asc', {
      caseSensitive: true,
      natural: true,
    }],
    'sort-imports-es6-autofix/sort-imports-es6': ['error', {
      ignoreCase: false,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['all', 'single', 'multiple', 'none'],
    }],
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
