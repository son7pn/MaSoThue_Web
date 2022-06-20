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
  // add your custom rules here
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],

    "skipBlankLines": false, //(default) disallows trailing whitespace on empty lines
    "skipBlankLines": true, //allows trailing whitespace on empty lines
    "ignoreComments": true,// (default) disallows trailing whitespace in comment blocks
    "ignoreComments": true,// allows trailing whitespace in comment blocks
    "eol-last": ["error", "never"],
    "exceptAfterSingleLine": false,
    "exceptAfterSingleLine": true,

    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 1
      },      
      "multiline": {
        "max": 1
      }
    }]
  },

}
