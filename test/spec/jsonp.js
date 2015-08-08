var assert = require('../util/assert')
  , oninfo = require('../util/oninfo')
  , ajax = require('ajax')
  , packet = {greeting: 'hello', number: 10};

describe('xdr (jsonp):', function() {
  it('a GET to /jsonp/echo should receive jsonp response on same domain',
    function(done) {
      var callback = function(response) {
        assert(response);
        done();
      }
      var opts = {
        url: 'http://localhost:9080/jsonp/echo',
        type: 'jsonp',
        callback: callback,
        data: packet
      };
      var info = ajax(opts);
      oninfo(info);
    }
  );
  it('a GET to http://127.0.0.1:9080/jsonp/echo should receive jsonp response on cross domain',
    function(done) {
      var callback = function(response) {
        assert(response);
        done();
      }
      var opts = {
        url: 'http://127.0.0.1:9080/jsonp/echo',
        type: 'jsonp',
        callback: callback,
        data: packet
      };
      var info = ajax(opts);
      oninfo(info);
    }
  );
  it('multiple GET to http://127.0.0.1:9080/jsonp/echo should receive multiple jsonp responses on cross domain',
    function(done) {
      var received = 0;
      var callback = function(response) {
        assert(response);
        received++;
        if(received == 3) {
          done();
        }
      }
      var opts = {
        url: 'http://127.0.0.1:9080/jsonp/echo',
        type: 'jsonp',
        callback: callback,
        data: packet
      };
      ajax(opts);
      ajax(opts);
      ajax(opts);
    }
  );
});
