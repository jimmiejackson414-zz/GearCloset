const path = require('path');

require('dotenv').config();

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  globals: {
    $nuxt: true
  },
  ignorePatterns: ['jsconfig.json'],
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '~': path.join(__dirname, './*')
            },
            extensions: ['.js', '.vue']
          }
        }
      }
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'arrow-parens': 0,
    'vue/html-self-closing': [
      1,
      {
        html: {
          void: 'any',
          normal: 'any',
          component: 'any'
        }
      }
    ],
    'vue/max-attributes-per-line': [
      2,
      {
        multiline: {
          allowFirstLine: false
        }
      }
    ],
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always'
      }
    ],
    'vue/script-indent': [
      'error',
      2,
      {
        baseIndent: 1
      }
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never'
      }
    ],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT'
        ],
        alphabetical: true
      }
    ],
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'fetch',
          'asyncData',
          'data',
          'computed',
          'methods',
          'LIFECYCLE_HOOKS',
          'watch',
          ['components', 'directives', 'filters'],
          'head',
          ['template', 'render'],
          'renderError'
        ]
      }
    ]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
        'vue/script-indent': [
          'error',
          2,
          {
            baseIndent: 1
          }
        ]
      }
    }
  ]
};
