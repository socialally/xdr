var ghost
  , path = require('path');

try {
  // try to load per-developer config from
  // the root of the project, this file should
  // be included in the .gitignore file for the project
  ghost = require(path.join(process.cwd(), 'ghost-mode'));
// ignore if the files does not exist
// use default behaviour: everything enabled
}catch(e){}

var config = {
  start: {
    dest: process.cwd(),
    ghostMode: ghost !== undefined ? ghost : true
  },
  clean: [
    './instrument',
    './coverage',
    './test/spec.*'
  ],
  spec: {
    main: './test/spec/index.js',
    paths: ['./lib', './test/fixture', './nodes_modules/sa-assert'],
    map: './',
    dest: './test',
    source: 'spec.js',
    builtins: {assert: false}
  },
  cover: {
    file: './coverage/coverage.json',
    main: './test/spec/index.js',
    paths: ['./instrument', './test/fixture'],
    map: './',
    dest: './test',
    source: 'spec.js',
    builtins: {assert: false}
  },
  lint: {
    src: ['./lib/**/*.js'],
    rules: {
      'brace-style': [2, '1tbs', { 'allowSingleLine': true }],
      'comma-style': ['never'],
      'max-len': [1, 80, 4],
      'no-extra-semi': 0,
      'no-multiple-empty-lines': [2, {'max': 1}],
      'no-self-compare':  2,
      'no-underscore-dangle': 0,
      'quotes': [1, 'single'],
      'semi': 0,
      'space-after-keywords': ['never'],
      'space-in-brackets': [2, 'never'],
      'space-in-parens': [2, 'never'],
      'spaced-line-comment': ['never'],
      'strict': 0
    },
    envs: ['browser', 'node']
  }
}

module.exports = config;
