define(function(require) {
  var packet = {greeting: 'hello', number: 10};
  var error = require('util/error');
  var assert = require('util/assert');
  var ajax = require('ajax');
  var clone = function() {

  }
  describe('Jsonp transport', function() {
    it('a GET to /jsonp/echo should receive json response on same domain',
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
        console.log(info);
      }
    );
    it('a GET to http://xdomain.socialal.ly/jsonp/echo should receive json response on cross domain',
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
        ajax(opts);
      }
    );
    it('multiple GET to http://xdomain.socialal.ly/jsonp/echo should receive json response on cross domain',
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
