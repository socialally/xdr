define(function(require) {
  var error = require('util/error');
  var assert = require('util/assert');
  var oninfo = require('util/oninfo');
  var ajax = require('ajax');
  describe('Ajax transport', function() {
    it('a GET to /static should receive json response on same domain',
      function(done) {
        var success = function(response, xhr) {
          assert(response, xhr);
          done();
        }
        var opts = {
          url: '/static',
          type: 'json',
          success: success,
          error: error
        };
        var info = ajax(opts);
        oninfo(info);
      }
    );
    it('a GET to http://xdomain.socialal.ly/static should receive json response on cross domain',
      function(done) {
        var success = function(response, xhr) {
          assert(response, xhr);
          done();
        }
        var opts = {
          url: 'http://xdomain.socialal.ly/static',
          type: 'json',
          success: success,
          error: error
        };
        var info = ajax(opts);
        oninfo(info);
      }
    );
  });
});
