define(function(require) {
  var assert = function(response) {
    expect(response).to.have.property('status')
      .to.be.a('number').that.equals(400);
    expect(response).to.have.property('error')
      .to.be.an.instanceof(Error);
    expect(response.error).to.have.property('message')
      .to.equal('Bad request')
  }

  var ajax = require('ajax');
  describe('Ajax transport', function() {
    it('a GET to /error/400 should receive error response on same domain',
      function(done) {
        var opts = {
          url: '/error/400',
          type: 'json'
        };
        ajax(opts, function(response) {
          assert(response);
          done();
        });
      }
    );
    it('a GET to http://xdomain.socialal.ly/error/400 should receive error response on cross domain',
      function(done) {
        var opts = {
          url: 'http://xdomain.socialal.ly/error/400',
          type: 'json'
        };
        ajax(opts, function(response) {
          assert(response);
          done();
        });
      }
    );
  });
});
