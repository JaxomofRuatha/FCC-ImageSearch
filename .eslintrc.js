module.exports = {
    extends: 'airbnb-base',
    parser: 'babel-eslint',
    env: {
      node: true
    },
    plugins: ['import'],
    rules: {
      'comma-dangle': [2, 'only-multiline'],
      'max-len': [0, {ignoreUrls: true}],
      'no-plusplus': [0],
      'no-underscore-dangle': [0],
      'no-unused-expressions': [
        1, {
          allowTernary: true
        }
      ],
      'no-use-before-define': [0],
      'quote-props': [1, 'consistent'],
      'import/no-extraneous-dependencies': [2, {devDependencies: true}]
    }
  };