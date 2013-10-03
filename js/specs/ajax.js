define(function(require) {
  var ajax = require('ajax');
  describe('Ajax client', function() {
    it('should receive echo response', function(done) {
      var opts = {
        url: '/echo',
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        data: JSON.stringify({})
      };
      ajax(opts);
      done();
    });
  });
});
