var assert = require('../util/assert')
  , oninfo = require('../util/oninfo')
  , ajax = require('ajax');

describe('xdr:', function() {

  it('a GET to /static should receive json response on same domain',
    function(done) {
      var callback = function(response) {
        assert(response);
        done();
      }
      var opts = {
        url: 'http://localhost:9080/static',
        type: 'json',
        callback: callback
      };
      var info = ajax(opts);
      oninfo(info);
    }
  );

  it('a GET to http://127.0.0.1:9080/static should receive json response on cross domain',
    function(done) {
      var callback = function(response) {
        assert(response);
        done();
      }
      var opts = {
        url: 'http://127.0.0.1:9080/static',
        type: 'json',
        callback: callback
      };
      var info = ajax(opts);
      oninfo(info);
    }
  );

});
