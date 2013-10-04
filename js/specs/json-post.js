define(function(require) {
  var packet = {greeting: 'hello', number: 10};
  var error = require('util/error');
  var assert = require('util/assert');
  var ajax = require('ajax');
  describe('Ajax transport', function() {
    it('a POST to /echo should receive json response on same domain',
      function(done) {
        var success = function(response) {
          assert(response);
          done();
        }
        var opts = {
          url: '/echo',
          method: 'post',
          type: 'json',
          headers: {
            'content-type': 'application/json'
          },
          data: packet,
          success: success,
          error: error
        };
        ajax(opts);
      }
    );
    it('a POST to http://xdomain.socialal.ly/echo should receive json response on cross domain',
      function(done) {
        var success = function(response) {
          assert(response);
          done();
        }
        var opts = {
          url: 'http://xdomain.socialal.ly/echo',
          method: 'post',
          type: 'json',
          headers: {
            'content-type': 'application/json'
          },
          data: packet,
          success: success,
          error: error
        };
        ajax(opts);
      }
    );
  });
});
