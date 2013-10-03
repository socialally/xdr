// SEE: http://www.w3.org/TR/2007/WD-XMLHttpRequest-20071026/
// SEE: http://www.w3.org/TR/XMLHttpRequest2/
// SEE: https://www.inkling.com/read/javascript-definitive-guide-david-flanagan-6th/client-side-javascript-reference/xmlhttprequest
// SEE: XDomainRequest: http://msdn.microsoft.com/en-us/library/ie/cc288060(v=vs.85).aspx

;(function() {
  "use strict";

  /**
   *  Performs an ajax request.
   *
   *  @param options.method The HTTP method.
   *  @param options.url The URL to connect to.
   *  @param options.headers An object containing HTTP headers.
   *  @param options.timeout A timeout for the request in milliseconds.
   *  @param options.data Data to send with the request.
   *  @param options.credentials Authentication credentials.
   */
  var ajax = function(options) {
    var url = options.url;
    var method = options.method || ajax.defaults.method;
    var headers = options.headers || {};
    var timeout = options.timeout || ajax.defaults.timeout;
    var credentials = options.credentials || {};
    var req;

    // IE < 9
    var ie = "XDomainRequest" in window;

    var xhr = function() {
      if(ie) {
        //console.log("run as IE...");
        return new XDomainRequest();
      }else if(window.XMLHttpRequest) {
        return new XMLHttpRequest();
      }
      return null;
    }

    var response = function() {

    }

    var req = xhr(), z;
    req.open(method, url, true, credentials.username, credentials.password);
    for(z in ajax.defaults.headers) {
      req.setRequestHeader(z, ajax.defaults.headers[z]);
    }
    for(z in headers) {
      req.setRequestHeader(z, headers[z]);
    }
    req.onreadystatechange = function() {
      if(req.readyState == 4) {
        console.log("request complete...");
      }
    }

    //console.log("sending data..." + options.data );
    //
    req.timeout = timeout;

    // NOTE: the setTimeout() is used due to a flaw in IE XDomainRequest
    if(ie) {
      setTimeout(function(){
        req.send(options.data);
      }, 0);
    }else{
      req.send(options.data);
    }
  }

  /**
   *  Default options.
   */
  ajax.defaults = {
    method: 'get',
    timeout: 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }

  if(typeof module === "object" && typeof module.exports === "object") {
    module.exports = ajax;
  }else if(typeof(define) == 'function' && define.amd) {
    define("ajax", [], function () { return ajax; });
  }else if(window) {
    window.ajax = ajax;
  }
})();
