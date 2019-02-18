module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'import', 'react-hooks'],
  rules: {
    'no-console': 'warn',
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'import/no-unresolved': 2,
    'react-hooks/rules-of-hooks': 'error'
  },
  settings: {
    react: {
      version: '16.8'
    }
  }
}
