const path = require("path");

module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  extends: [
    "plugin:react/recommended",
    "prettier",
    "prettier/flowtype",
    "prettier/react"
  ],
  plugins: ["react", "flowtype", "graphql"],
  env: {
    browser: true
  },
  rules: {
    "jsx-quotes": ["error", "prefer-double"],
    "comma-dangle": [2, "always-multiline"],
    "object-curly-spacing": [2, "always"],
    "no-var": 2,
    "no-unused-vars": 2,
    "prefer-const": 2,
    "react/jsx-wrap-multilines": 2,
    "react/prefer-es6-class": 2,
    "react/prefer-stateless-function": 2,
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": ["error", "always"],
    semi: ["error", "never"],
    quotes: ["error", "single"],

    "flowtype/define-flow-type": "warn",
    "flowtype/delimiter-dangle": ["error", "always-multiline"],
    "flowtype/semi": ["error", "never"],
    "flowtype/sort-keys": "error",
    "flowtype/use-flow-type": "warn",

    "graphql/template-strings": [
      "error",
      {
        env: "apollo",
        schemaJsonFilepath: path.resolve(__dirname, "./src/schema.json")
      }
    ],
    "graphql/named-operations": [
      "error",
      {
        env: "apollo",
        schemaJsonFilepath: path.resolve(__dirname, "./src/schema.json")
      }
    ]
  }
};
