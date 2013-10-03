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
   *  @param options.delay A delay before invoking send() in milliseconds.
   *  @param options.data Data to send with the request.
   *  @param options.credentials Authentication credentials.
   *  @param options.success A callback for 2xx responses.
   *  @param options.error A callback for error responses.
   */
  var ajax = function(options) {
    var url = options.url;
    var method = options.method || ajax.defaults.method;
    var headers = options.headers || {};
    var timeout = options.timeout || ajax.defaults.timeout;
    var delay = options.delay || ajax.defaults.delay;
    var credentials = options.credentials || {};
    var req;

    // IE < 9
    var ie = ("XDomainRequest" in window);

    var xhr = function() {
      if(ie) {
        return new XDomainRequest();
      }else if(window.XMLHttpRequest) {
        return new XMLHttpRequest();
      }
      return null;
    }

    var response = function(response) {
      var status = "" + (response.status || 0);
      if(/^2/.test(status)) {
        if(typeof(options.success) == 'function') {
          options.success(response, response.xhr);
        }
      }else{
        if(typeof(options.error) == 'function') {
          options.error(response, response.xhr);
        }
      }
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
        var res = {status: req.status, xhr: req};
        response(res);
      }
    }

    req.timeout = timeout;

    // NOTE: the setTimeout() is used due to a flaw in IE XDomainRequest
    if(ie) {
      setTimeout(function(){
        req.send(options.data);
      }, delay);
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
    delay: 0,
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
