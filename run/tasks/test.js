var gulp = require('gulp')
  , phantomjs = require('gulp-mocha-phantomjs');

gulp.task('test', ['spec'], function() {
  return gulp.src('test/index.html')
    .pipe(phantomjs());
});
