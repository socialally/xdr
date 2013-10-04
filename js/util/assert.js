define(function(require) {
  var assert = function(response) {
    expect(response).to.have.property('status')
      .to.be.a('number').that.equals(200);

    // response data
    expect(response).to.have.property('data')
      .to.be.an('object');
    var data = response.data;
    expect(data).to.have.property('greeting')
      .to.be.a('string').that.equals('hello');
    expect(data).to.have.property('number')
      .to.be.a('number').that.equals(10);

    // response headers

    //expect(response).to.have.property('headers')
      //.to.be.an('object');
    //expect(response.headers).to.have.property('date')
      //.to.be.a('string');
    //expect(response.headers).to.have.property('content-length')
      //.to.be.a('string');
    //expect(response.headers).to.have.property('content-type')
      //.to.be.a('string').that.equals('application/json; charset=utf-8');
  }
  return assert;
});
