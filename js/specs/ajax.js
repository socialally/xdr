define(function(require) {
  var packet = {greeting: 'hello', number: 10};
  var ajax = require('ajax');
  describe('Ajax client', function() {
    it('should receive echo response on same domain', function(done) {
      var success = function(response, xhr) {
        //console.log("got success...");
        expect(response).to.have.property('status')
          .to.be.a('number').that.equals(200);
        expect(xhr).to.be.an('object');
        expect(response).to.have.property('headers')
          .to.be.an('object');
        expect(response.headers).to.have.property('date')
          .to.be.a('string');
        console.log("got headers: '" + response.headers.date + "'");
        done();
      }

      var error = function(response, xhr) {
        console.log('error: ' + response.status);
      }
      var opts = {
        url: '/echo',
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        data: JSON.stringify(packet),
        success: success,
        error: error
      };
      ajax(opts);
    });
  });
});
