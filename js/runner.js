require.config({
  baseUrl: './js',
  paths: {
    'mocha'         : 'lib/mocha',
    'chai'          : 'lib/chai'
  }
});

require(['require', 'chai', 'mocha'], function(require, chai){
  //window.host = 'http://regulus.socialal.ly';
  //window.host = 'http://localhost:10000';
  //window.ns = '/social-ally/demo/poll';

  window.expect = chai.expect;

  mocha.setup('bdd');

  require([
    'js/specs/jsonp.js',
    'js/specs/json-get.js',
    'js/specs/json-post.js'
  ], function(require) {
    if(window.mochaPhantomJS) {
      mochaPhantomJS.run();
    }else{
      mocha.run();
    }
  });
});
