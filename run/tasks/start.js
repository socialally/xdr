var gulp = require('gulp')
  , config = require('../config').start
  , browserSync = require('browser-sync')
  , runSequence = require('run-sequence')
  , url = require('url')
  , path = require('path')
  , fs = require('fs');

gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: config.dest,
      middleware: function (req, res, next) {
        var uri = url.parse(req.url);
        if(uri.pathname === '' || uri.pathname === '/') {
          res.writeHead(301, {'location': '/test'});
          return res.end();
        }else if (uri.pathname.length > 1 &&
            path.extname(uri.pathname) === '' &&
            fs.existsSync(config.dest + uri.pathname + '.html')) {
          req.url = uri.pathname + '.html' + (uri.search || '');
        }
        next();
      }
    },
    ghostMode: config.ghostMode
  });
})

gulp.task('start', function(cb) {
  runSequence(
    'clean', 'spec', 'server', cb);
});
