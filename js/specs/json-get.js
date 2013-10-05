define(function(require) {
  var assert = require('util/assert');
  var oninfo = require('util/oninfo');
  var ajax = require('ajax');
  describe('Ajax transport', function() {
    it('a GET to /static should receive json response on same domain',
      function(done) {
        var callback = function(response) {
          assert(response);
          done();
        }
        var opts = {
          url: '/static',
          type: 'json',
          callback: callback
        };
        var info = ajax(opts);
        oninfo(info);
      }
    );
    it('a GET to http://xdomain.socialal.ly/static should receive json response on cross domain',
      function(done) {
        var callback = function(response) {
          assert(response);
          done();
        }
        var opts = {
          url: 'http://xdomain.socialal.ly/static',
          type: 'json',
          callback: callback
        };
        var info = ajax(opts);
        oninfo(info);
      }
    );
  });
});
