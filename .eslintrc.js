module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    "skipBlankLines": true, //(default) disallows trailing whitespace on empty lines
    "skipBlankLines": true, //allows trailing whitespace on empty lines
    "ignoreComments": true,// (default) disallows trailing whitespace in comment blocks
    "ignoreComments": true// allows trailing whitespace in comment blocks
  }
}
