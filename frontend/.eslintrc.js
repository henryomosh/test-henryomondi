module.exports = {
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",

  ],
  plugins: [
    "no-comments",
  ],
  "parserOptions": {
    "ecmaVersion": 2020,
  },
  rules: {
    "no-trailing-spaces": 1,
    "semi": 2,
    "quotes": [1, "double"],
    "vue/max-attributes-per-line": 0,
    "vue/singleline-html-element-content-newline": 0,
    "vue/attribute-hyphenation": ["warn", "always", { ignore: ["viewBox"] }],
    "vue/match-component-file-name": ["error", {
      "extensions": ["vue"],
      "shouldMatchCase": false,
    }],
    "vue/no-reserved-component-names": ["error", {
      "disallowVueBuiltInComponents": true,
      "disallowVue3BuiltInComponents": true,
    }],
    "vue/no-static-inline-styles": 2,
    "no-console": ["warn", { allow: ["warn", "error", "debug"] }],
    "arrow-parens": 2,
    "curly": "error",
    "indent": ["error", 2],
    "no-empty": "error",
    "no-unused-vars": 2,
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always",
    }],
    "keyword-spacing": 2,
    "space-before-blocks": "error",
    "func-call-spacing": ["error", "never"],
    "space-infix-ops": "error",
    "space-unary-ops": "error",
    "no-multi-spaces": "error",
    "key-spacing": ["error", { "beforeColon": false }],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "prefer-template": "error",
    "linebreak-style": ["error", "unix"],
    "object-curly-spacing": ["error", "always"],
    "brace-style": ["error", "1tbs"],
    "no-comments/disallowComments": "error",
  },
  "env": {
    "jest": true
  }
};

