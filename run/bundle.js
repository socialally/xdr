var gulp = require('gulp')
  , browserify = require('browserify')
  , gutil = require('gulp-util')
  , uglify = require('gulp-uglify')
  , size = require('gulp-size')
  , sourcemaps = require('gulp-sourcemaps')
  , source = require('vinyl-source-stream')
  , buffer = require('vinyl-buffer');

function create(opts) {
  var b = browserify(opts.main, opts);
  return b;
}

function bundle(opts, cb) {
  var bundler = create(opts);
  return bundler.bundle()
    .on('error', gutil.log)
    .pipe(source(opts.source))
    .pipe(buffer())
    // loads map from browserify file
    .pipe(opts.map ? sourcemaps.init({loadMaps: true}) : gutil.noop())
    // uglify compiled file
    .pipe(opts.minify ? uglify() : gutil.noop())
    // report size before writing source map.
    .pipe(size({title:'js'}))
    // writes .map file
    .pipe(opts.map ? sourcemaps.write(opts.map) : gutil.noop())
    .pipe(gulp.dest(opts.dest));
}

module.exports = bundle;
