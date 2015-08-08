var ajax = require('ajax')
  , expect = require('chai').expect;

function assert(response) {
  expect(response).to.have.property('status')
    .to.be.a('number').that.equals(400);
  expect(response).to.have.property('error')
    .to.be.an.instanceof(Error);
  expect(response.error).to.have.property('message')
    .to.equal('Bad request')
}

describe('xdr:', function() {
  it('a GET to /error/400 should receive error response on same domain',
    function(done) {
      var opts = {
        url: 'http://localhost:9080/error/400',
        type: 'json'
      };
      ajax(opts, function(response) {
        assert(response);
        done();
      });
    }
  );

  it('a GET to http://127.0.0.1:9080/error/400 should receive error response on cross domain',
    function(done) {
      var opts = {
        url: 'http://127.0.0.1:9080/error/400',
        type: 'json'
      };
      ajax(opts, function(response) {
        assert(response);
        done();
      });
    }
  );

});
