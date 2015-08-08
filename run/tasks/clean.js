var gulp = require('gulp')
  , config = require('../config').clean
  , del = require('del');

gulp.task('clean', function (cb) {
  del(config, cb);
})
