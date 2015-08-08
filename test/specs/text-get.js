define(function(require) {
  var packet = {greeting: 'hello', number: 10};
  var assert = require('util/assert');
  var oninfo = require('util/oninfo');
  var ajax = require('ajax');
  describe('Ajax transport', function() {
    it('a GET to /text/echo with query string payload should receive text response on same domain',
      function(done) {
        var callback = function(response) {
          response.data = JSON.parse(response.data);
          assert(response);
          done();
        }
        var opts = {
          url: '/text/echo',
          type: 'text',
          data: JSON.stringify(packet),
          callback: callback,
          parameter: 'jsontext'
        };
        var info = ajax(opts);
        oninfo(info);
      }
    );
    it('a GET to http://127.0.0.1:9080/text/echo should receive json response on cross domain',
      function(done) {
        var callback = function(response) {
          response.data = JSON.parse(response.data);
          assert(response);
          done();
        }
        var opts = {
          url: 'http://127.0.0.1:9080/text/echo',
          type: 'text',
          data: JSON.stringify(packet),
          callback: callback,
          parameter: 'jsontext'
        };
        var info = ajax(opts);
        oninfo(info);
      }
    );
  });
});
