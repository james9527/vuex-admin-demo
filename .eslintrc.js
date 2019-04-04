module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": [
    "standard"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  },
  "plugins": [
    "eslint-plugin-html"
  ],
  "rules": {
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    // 驼峰命名法
    "camelcase": 0,
    "semi": 1,
    "no-new": 0,
    "no-undef": 0,
    // 行尾逗号
    "comma-dangle": ["error", "only-multiline"],
    // https://eslint.org/docs/rules/prefer-promise-reject-errors
    "prefer-promise-reject-errors": 0,
    // https://eslint.org/docs/rules/padded-blocks
    "padded-blocks": 0,
    // https://eslint.org/docs/rules/no-trailing-spaces
    "no-trailing-spaces": ["error", {
      "skipBlankLines": true
    }],
    // https://eslint.org/docs/rules/no-unreachable
    "no-unreachable": 1,

  }
};
