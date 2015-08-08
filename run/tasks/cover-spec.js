var gulp = require('gulp')
  , config = require('../config')
  , bundle = require('../bundle');

gulp.task(
  'cover-spec', bundle.bind(null, config.cover));
