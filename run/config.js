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
    rules: {},
    envs: ['browser', 'node']
  }
}

try {
  config.lint.rules = require(path.join(process.env.HOME, '.salint.js'));
}catch(e){}

module.exports = config;
