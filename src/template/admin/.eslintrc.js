module.exports = {
  root: true,
  extends: ['plugin:vue/essential', '@vue/standard', 'plugin:prettier/recommended'],
  env: {
      browser: true,
      es6: true
  },
  plugins: ['vue'],
  rules: {
      'prettier/prettier': 'error',
      // allow async-await
      'generator-star-spacing': 'off',
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'vue/no-parsing-error': [
          2,
          {
              'x-invalid-end-tag': false
          }
      ],
      'no-undef': 'off',
      camelcase: 'off'
  },
  parserOptions: {
      parser: 'babel-eslint'
  }
};
