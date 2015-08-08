var gulp = require('gulp')
  , eslint = require('gulp-eslint')
  , config = require('../config')

function lint() {
  return gulp.src(config.lint.src)
    .pipe(eslint(config.lint))
    .pipe(eslint.format())
}

gulp.task('lint', lint);
