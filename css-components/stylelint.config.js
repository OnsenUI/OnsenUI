module.exports = {
  ignoreFiles: [
    './src/components/combination.css',
    './src/iphonex-support/**/*.css'
  ],

  defaultSeverity: 'warning',

  rules: {
    // Color
    'color-hex-case': 'lower',
    'color-hex-length': null,
    'color-named': null,
    'color-no-hex': null,
    'color-no-invalid-hex': true,

    // Font
    'font-family-name-quotes': 'always-unless-keyword',
    'font-family-no-duplicate-names': true,
    'font-weight-notation': 'numeric',

    // Function
    'function-blacklist': null,
    'function-calc-no-unspaced-operator': true,
    'function-comma-newline-after': 'never-multi-line',
    'function-comma-newline-before': null,
    'function-comma-space-after': 'always',
    'function-comma-space-before': 'never',
    'function-linear-gradient-no-nonstandard-direction': true,
    'function-max-empty-lines': 0,
    'function-name-case': 'lower',
    'function-parentheses-newline-inside': null,
    'function-parentheses-space-inside': 'never',
    'function-url-no-scheme-relative': null,
    'function-url-quotes': 'always',
    'function-url-scheme-whitelist': null,
    'function-whitelist': null,
    'function-whitespace-after': 'always',

    // Number
    'number-leading-zero': null,
    'number-max-precision': null,
    'number-no-trailing-zeros': true,

    // String
    'string-no-newline': true,
    'string-quotes': 'single',
    
    // Length
    'length-zero-no-unit': true,

    // Time
    'time-min-milliseconds': null,

    // Unit
    'unit-blacklist': null,
    'unit-case': 'lower',
    'unit-no-unknown': true,
    'unit-whitelist': null,

    // Value
    'value-keyword-case': 'lower',
    'value-no-vendor-prefix': true,

    // Value list
    'value-list-comma-newline-after': null,
    'value-list-comma-newline-after': null,
    'value-list-comma-space-after': 'always-single-line',
    'value-list-comma-space-before': 'never',
    'value-list-max-empty-lines': 0,

    // Custom property
    'custom-property-empty-line-before': null,
    'custom-property-pattern': null,

    // Shorthand property
    'shorthand-property-no-redundant-values': null,

    // Property
    'property-blacklist': null,
    'property-case': 'lower',
    'property-no-unknown': true,
    'property-no-vendor-prefix': null,
    'property-whitelist': null,

    // Keyframe declaration
    'keyframe-declaration-no-important': true,

    // Declration
    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',
    'declaration-colon-newline-after': null,
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-empty-line-before': null,
    'declaration-no-important': true,
    'declaration-property-unit-blacklist': null,
    'declaration-property-unit-whitelist': null,
    'declaration-property-value-blacklist': null,
    'declaration-property-value-whitelist': null,

    // Declaration block
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-redundant-longhand-properties': null,
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-block-semicolon-newline-after': 'always',
    'declaration-block-semicolon-newline-before': null,
    'declaration-block-semicolon-space-after': null,
    'declaration-block-semicolon-space-before': null,
    'declaration-block-single-line-max-declarations': null,
    'declaration-block-trailing-semicolon': 'always',

    // Block
    'block-closing-brace-empty-line-before': 'never',
    'block-closing-brace-newline-after': 'always',
    'block-closing-brace-newline-before': 'always',
    'block-closing-brace-space-after': null,
    'block-closing-brace-space-before': null,
    'block-no-empty': null,
    'block-opening-brace-newline-after': 'always',
    'block-opening-brace-newline-before': null,
    'block-opening-brace-space-after': null,
    'block-opening-brace-space-before': null,

    // Selector
    'selector-attribute-brackets-space-inside': 'never',
    'selector-attribute-operator-blacklist': null,
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-operator-space-before': 'never',
    'selector-attribute-operator-whitelist': null,
    'selector-attribute-quotes': 'always',
    'selector-class-pattern': '^([a-z0-9]+(-[a-z0-9]+)*)(--[a-z0-9]+(-[a-z0-9]+)*)?(__([a-z0-9]+(-[a-z0-9]+)*)(--[a-z0-9]+(-[a-z0-9]+)*)?)*$', // MindBEMding style
    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-descendant-combinator-no-non-space': true,
    'selector-id-pattern': null,
    'selector-max-compound-selectors': 3,
    'selector-max-specificity': '0,3,1',
    'selector-nested-pattern': null,
    'selector-no-qualifying-type': true,
    'selector-no-vendor-prefix': true,
    'selector-pseudo-class-blacklist': null,
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-class-no-unknown': true,
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-pseudo-class-whitelist': null,
    'selector-pseudo-element-case': 'lower',
    'selector-pseudo-element-colon-notation': 'single',
    'selector-pseudo-element-no-unknown': true,
    'selector-type-case': 'lower',
    'selector-type-no-unknown': true,
    'selector-max-empty-lines': 0,

    // Rule
    'rule-empty-line-before': ['always', {except: ['after-single-line-comment', 'first-nested']}],

    // Media feature
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-name-blacklist': null,
    'media-feature-name-case': 'lower',
    'media-feature-name-no-unknown': true,
    'media-feature-name-no-vendor-prefix': null,
    'media-feature-name-whitelist': null,
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',

    // Custom media
    'custom-media-pattern': null,

    // Media query list
    'media-query-list-comma-newline-after': null,
    'media-query-list-comma-newline-before': null,
    'media-query-list-comma-space-after': 'always',
    'media-query-list-comma-space-before': 'never',

    // At-rule
    'at-rule-blacklist': null,
    'at-rule-empty-line-before': null,
    'at-rule-name-case': 'lower',
    'at-rule-name-newline-after': null,
    'at-rule-name-space-after': 'always',
    'at-rule-no-unknown': true,
    'at-rule-no-vendor-prefix': null,
    'at-rule-semicolon-newline-after': 'always',
    'at-rule-whitelist': null,

    // Comment
    'comment-empty-line-before': null,
    'comment-no-empty': true,
    'comment-whitespace-inside': null,
    'comment-word-blacklist': null,

    // General / Sheet
    'indentation': 2,
    'max-empty-lines': 1,
    'max-line-length': null,
    'max-nesting-depth': null,
    'no-descending-specificity': true,
    'no-duplicate-selectors': true,
    'no-empty-source': true,
    'no-eol-whitespace': true,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': true,
    'no-missing-end-of-source-newline': null,
    'no-unknown-animations': true
  }
};
