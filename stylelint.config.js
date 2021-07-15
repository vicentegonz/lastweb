module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order', 'stylelint-scss'],
  rules: {
    'at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['use'] },
    ],
    'order/properties-alphabetical-order': true,
    'color-hex-length': 'long',
    'font-family-name-quotes': 'always-unless-keyword',
    'no-empty-first-line': true,
    'string-quotes': 'double',
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
};
