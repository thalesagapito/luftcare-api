module.exports = {
  root: true,
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base'
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-restricted-syntax': [
      'warn',
      {
        'selector': ':not(BinaryExpression:matches([operator="!=="], [operator="==="])) > Literal[value=null]',        
        'message': 'Usage of "null" is deprecated except when received from legacy APIs; use "undefined" instead'
      },
    ],
    'max-len': ['error', 120, 2, {
      'ignorePattern': '(^export\\sdefault\\sclass.+)|(^import\\s.+\\sfrom\\s.+;)|(^\\s+@apply\\s.*;)|(^.*async.*)$',
      'ignoreUrls': true
    }],
    '@typescript-eslint/explicit-function-return-type': ['off', {
      allowTypedFunctionExpressions: true,
    }],
  }
};