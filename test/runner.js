require.config({
  baseUrl: './',
  paths: {
    'mocha'         : 'lib/mocha',
    'chai'          : 'lib/chai',
    'ajax'          : '../js/ajax'
  }
});

require(['require', 'chai', 'mocha'], function(require, chai){
  window.expect = chai.expect;
  mocha.setup('bdd');
  require([
    'specs/jsonp.js',
    'specs/json-get.js',
    'specs/json-post.js',
    'specs/text-get.js',
    'specs/bad-request.js'
  ], function(require) {
    if(window.mochaPhantomJS) {
      mochaPhantomJS.run();
    }else{
      mocha.run();
    }
  });
});
