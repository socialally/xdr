;(function() {
  "use strict";

  /**
   *  Performs an ajax request.
   *
   *  @param options.method The HTTP method.
   *  @param options.url The URL to connect to.
   *  @param options.headers An object containing HTTP headers.
   */
  var ajax = function(options) {
    var url = options.url;
    var method = options.method || 'get';
    var headers = options.headers || {};
    var req;

    // IE < 9
    var ie = "XDomainRequest" in window;

    var xhr = function() {
      if(ie) {
        console.log("run as IE...");
        return new XDomainRequest();
      }else if(window.XMLHttpRequest) {
        return new XMLHttpRequest();
      }
      return null;
    }

    var response = function() {

    }

    var req = xhr();



  }

  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = ajax;
  }else if(typeof(define) == 'function' && define.amd) {
    define("ajax", [], function () { return ajax; });
  }else if(window) {
    window.ajax = ajax;
  }
})();
