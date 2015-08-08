var gulp = require('gulp')
  , config = require('../config')
  , bundle = require('../bundle');

gulp.task('spec', bundle.bind(null, config.spec));
