var gulp = require('gulp')
  , phantomjs = require('gulp-mocha-phantomjs')
  , report = require('gulp-istanbul-report')
  , config = require('../config').cover;

gulp.task('cover', ['cover-spec'], function () {
  gulp.src('test/index.html', {read: false})
    .pipe(phantomjs({
      phantomjs: {
        hooks: 'mocha-phantomjs-istanbul',
        coverageFile: config.file
      },
      reporter: 'spec'
    }))
    .on('finish', function() {
      gulp.src(config.file)
        .pipe(report(
          {
            reporterOpts: {
              dir: './coverage'
            },
            reporters: [
              'text-summary',
              'lcov'
            ]
          }
        ))
    });
});
