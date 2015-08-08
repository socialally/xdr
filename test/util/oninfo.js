var expect = require('chai').expect;

module.exports = function oninfo(info) {
  expect(info).to.have.property('url').to.be.a('string');
  expect(info).to.have.property('xhr');
  expect(info).to.have.property('abort').to.be.a('function');
  expect(info).to.have.property('cors').to.be.a('boolean');
  expect(info).to.have.property('ie').to.be.an('object');
}
