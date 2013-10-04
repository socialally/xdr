define(function(require) {
  var packet = {greeting: 'hello', number: 10};
  var error = require('util/error');
  var assert = require('util/assert');
  var oninfo = require('util/oninfo');
  var ajax = require('ajax');
  describe('Jsonp transport', function() {
    it('a GET to /jsonp/echo should receive jsonp response on same domain',
      function(done) {
        var success = function(response) {
          assert(response);
          done();
        }
        var opts = {
          url: '/jsonp/echo',
          type: 'jsonp',
          success: success,
          error: error,
          data: packet
        };
        var info = ajax(opts);
        oninfo(info);
      }
    );
    it('a GET to http://xdomain.socialal.ly/jsonp/echo should receive jsonp response on cross domain',
      function(done) {
        var success = function(response) {
          assert(response);
          done();
        }
        var opts = {
          url: 'http://xdomain.socialal.ly/jsonp/echo',
          type: 'jsonp',
          success: success,
          error: error,
          data: packet
        };
        var info = ajax(opts);
        oninfo(info);
      }
    );
    it('multiple GET to http://xdomain.socialal.ly/jsonp/echo should receive multiple jsonp responses on cross domain',
      function(done) {
        var received = 0;
        var success = function(response) {
          assert(response);
          received++;
          if(received == 3) {
            done();
          }
        }
        var opts = {
          url: 'http://xdomain.socialal.ly/jsonp/echo',
          type: 'jsonp',
          success: success,
          error: error,
          data: packet
        };
        ajax(opts);
        ajax(opts);
        ajax(opts);
      }
    );
  });
});
