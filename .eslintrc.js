module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  // env: {
  //   es2021: true,
  //   'react-native/react-native': true,
  // },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsx: true,
    createDefaultProgram: true,
    project: ['./tsconfig.json'], // Specify it only for TypeScript files
  },
  plugins: ['@typescript-eslint', 'prettier', 'react', 'react-native'],
  rules: {
    'import/prefer-default-export': 'off',
    'react/function-component-definition': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-native/no-unused-styles': 'off',
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'external',
          'builtin',
          'internal',
          'sibling',
          'parent',
          'index',
        ],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
  },
  overrides: [
    {
      files: ['*story.tsx'],
      rules: {
        'import/no-extraneous-dependencies': ['off'],
      },
    },
  ],
};
