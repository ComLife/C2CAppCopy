module.exports = {
  root: true,
  extends: [
    '@react-native-community',
  ],
  plugins: ['react', 'react-native'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-color-literals': 0,
    'sort-imports': [2, { ignoreDeclarationSort: true }],
    'eqeqeq': ['error', 'always', { null: 'ignore' }],
    "quotes": [1, "single"],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
