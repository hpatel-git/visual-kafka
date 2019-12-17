module.exports = {
  extends: 'erb',
  settings: {
    'import/resolver': {
      webpack: {
        config: require.resolve('./configs/webpack.config.eslint.js')
      }
    }
  },
  rules: {
    'no-console': 0, //change this depending on your development needs
    'semi': 0,
    // add or override additional rules here: https://eslint.org/docs/rules/
  },
}
