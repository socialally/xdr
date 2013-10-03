// SEE: http://www.w3.org/TR/2007/WD-XMLHttpRequest-20071026/
// SEE: http://www.w3.org/TR/XMLHttpRequest2/
// SEE: https://www.inkling.com/read/javascript-definitive-guide-david-flanagan-6th/client-side-javascript-reference/xmlhttprequest
// SEE: XDomainRequest: http://msdn.microsoft.com/en-us/library/ie/cc288060(v=vs.85).aspx

;(function() {
  "use strict";

  var ie = (function () {
    var ret, version, browser = false, jscriptMap, jscriptVersion;
    jscriptMap = {
      "5.5": 5.5,
      "5.6": 6,
      "5.7": 7,
      "5.8": 8,
      "9": 9,
      "10": 10
    };
    jscriptVersion = new Function("/*@cc_on return @_jscript_version; @*/")();
    if (jscriptVersion !== undefined) {
      browser = true;
      version = jscriptMap[jscriptVersion];
    }
    ret = {version: version, browser: browser};
    return ret;
  }());

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
   *  @param options.mime A MIME type passed to overrideMimeType().
   *  @param options.async Whether the request is asynchronous.
   */
  var ajax = function(options) {
    var url = options.url;
    var method = options.method || ajax.defaults.method;
    var headers = options.headers || {};
    var timeout = options.timeout || ajax.defaults.timeout;
    var delay = options.delay || ajax.defaults.delay;
    var async = (typeof(options.async) == 'boolean') ? options.async
       : ajax.defaults.async;
    var credentials = options.credentials || {};
    var req;

    /**
     *  Parse response headers into an object.
     *
     *  @param headers The response headers as a string.
     *
     *  @return An object encapsulating the response headers.
     */
    var parse = function(headers) {
      var output = {}, i, p, k, v;
      headers = headers || "";
      headers = headers.replace('\r', '');
      headers = headers.split('\n');
      for(i = 0;i < headers.length;i++) {
        p = headers[i].indexOf(':');
        k = headers[i].substr(0, p);
        v = headers[i].substr(p + 1);
        if(k && v) {
          k = k.replace(/^\s+/, '').replace(/\s+$/, '');
          v = v.replace(/^\s+/, '').replace(/\s+$/, '');
          output[k.toLowerCase()] = v;
        }
      }
      return output;
    }

    var convert = function(text) {
      //console.log("convert text: " + text);
      //console.log("convert text: " + options.type);
      return text;
    }

    // unsupported version of ie
    if(ie.browser && ie.version < 8) {
      return false;
    }
    var cors = !('XDomainRequest' in window)
      || ie.browser && ie.version == 10;

    //alert("use cors: " + cors);

    var xhr = function() {
      if(!cors) {
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
    if(req) {
      if(!cors) {
        req.open(method, url);
        req.onload = function() {
          alert('ie loaded:' + req.responseText);
          alert('ie status: ' + req.status);
          var res = {status: this.status || 200, xhr: this};
          //res.headers = parse(this.getAllResponseHeaders());
          res.headers = null;
          res.data = convert(this.responseText);
          response(res);
        };
        req.onerror = function() {alert('ie error...')};
        req.ontimeout = req.onprogress = function(){};
      }else{
        //alert('using cors...');
        req.open(method, url, async, credentials.username, credentials.password);
        for(z in ajax.defaults.headers) {
          req.setRequestHeader(z, ajax.defaults.headers[z]);
        }
        for(z in headers) {
          req.setRequestHeader(z, headers[z]);
        }
        req.onreadystatechange = function() {
          if(this.readyState == 4) {
            var res = {status: this.status, xhr: this};
            res.headers = parse(this.getAllResponseHeaders());
            res.data = convert(this.responseText);
            response(res);
          }
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
  }

  /**
   *  Default options.
   */
  ajax.defaults = {
    method: 'get',
    timeout: 10000,
    delay: 0,
    async: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }

  if(typeof(module) === "object" && typeof(module.exports) === "object") {
    module.exports = ajax;
  }else if(typeof(define) == 'function' && define.amd) {
    define("ajax", [], function () { return ajax; });
  }else if(window) {
    window.ajax = ajax;
  }
})();
