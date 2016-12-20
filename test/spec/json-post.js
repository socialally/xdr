var assert = require('../util/assert')
  , oninfo = require('../util/oninfo')
  , ajax = require('ajax')
  , packet = {greeting: 'hello', number: 10};

describe('xdr (json):', function() {
  it('a POST to /echo should receive json response on same domain',
    function(done) {
      var callback = function(response) {
        assert(response);
        done();
      }
      var opts = {
        url: 'http://localhost:9080/echo',
        method: 'post',
        type: 'json',
        //headers: {
          //'content-type': 'application/json'
        //},
        data: packet,
        callback: callback
      };
      var info = ajax(opts);
      oninfo(info);
    }
  );
  it('a POST to http://127.0.0.1:9080/echo should receive json response on cross domain',
    function(done) {
      var callback = function(response) {
        assert(response);
        done();
      }
      var opts = {
        url: 'http://127.0.0.1:9080/echo',
        method: 'post',
        type: 'json',
        //headers: {
          //'content-type': 'application/json'
        //},
        data: packet,
        callback: callback
      };
      var info = ajax(opts);
      oninfo(info);
    }
  );
});
