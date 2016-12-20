Table of Contents
=================

* [Cross Domain Ajax](#cross-domain-ajax)
  * [Install](#install)
  * [Design Goals](#design-goals)
  * [Server Implementation](#server-implementation)
  * [Browser Compatibility](#browser-compatibility)
    * [Full Support](#full-support)
    * [Partial Support](#partial-support)
    * [XDomainRequest (IE 8/9)](#xdomainrequest-ie-89)
    * [Known Issues](#known-issues)
  * [API](#api)
    * [Options](#options)
    * [Return](#return)
    * [Response](#response)
    * [ajax.defaults](#ajaxdefaults)
    * [ajax.jsonp](#ajaxjsonp)
    * [ajax.converters](#ajaxconverters)
    * [ajax.ie](#ajaxie)
    * [Examples](#examples)
      * [JSON GET](#json-get)
      * [JSON POST](#json-post)
      * [JSONP](#jsonp)
      * [Errors](#errors)
      * [Abort](#abort)
  * [Developer](#developer)
    * [Test](#test)
    * [Start](#start)
    * [Cover](#cover)
    * [Lint](#lint)
    * [Clean](#clean)
    * [Spec](#spec)
    * [Instrument](#instrument)
    * [Readme](#readme)
  * [Appendix](#appendix)
    * [Simple Headers](#simple-headers)
    * [Related Links](#related-links)

Cross Domain Ajax
=================

A UMD cross-domain Ajax implementation.

## Install

```
npm i xdr
```

## Design Goals

* Must support IE 8/9.
* Must be able to load resources cross-domain.
* Must support text, json, and jsonp.
* Must be as lightweight as possible, ~4KB minified.

Use this library if you need to support IE8 (cross-domain) and want robust error handling by convention. Requires server-side code to respond following the convention for overriding the response status code and error messages see the [server implementation](#server-implementation) notes.

## Server Implementation

The server must at a minimum send the appropriate headers for CORS support, see [server.js](https://github.com/socialally/xdrlib/server.js) for example headers.

In addition, in order to support the `XDomainRequest` object for IE 8/9 the server must process requests *that do not contain a Content-Type header* and the client must know the type of data the server responds with. 

To support error handling for instances when the http status code is not available the server should reply with a packet that contains `code` and `error` properties.

A successful 2xx response may be returned as:

```
{code: 202, message: "Request accepted"}
```

Whereas for an error the server could reply with:

```
{code: 400, error: {message: "Bad request"}}
```

The fields used for extracting status codes and error messages are configurable using the `status` and `error` options.

## Browser Compatibility

### Full Support

Full support is deemed to be browsers that can make cross domain requests and access the response headers:

* Chrome 18+
* Safari 6+
* Firefox 21+
* Opera 12+
* Internet Explorer 10+

### Partial Support

* Chrome 14-17 and Safari 5/5.1 do not respect the `Access-Control-Expose-Headers` response header so assertions fail on the response headers.
* Firefox 4-20 do not expose cross domain response headers using `getAllResponseHeaders()`.
* Internet Explorer 8/9 have many restrictions see [XDomainRequest](#xdomainrequest-ie-89).

### XDomainRequest (IE 8/9)

* Only `GET` and `POST` methods are allowed.
* Response headers are not available to browsers using the `XDomainRequest` object.
* The `async` option is ignored for `XDomainRequest` instances.
* Authentication credentials may not be used with `XDomainRequest`.
* `XDomainRequest` cannot set request headers, specifically no `Content-Type` header may be set.
* The response status code is not exposed by `XDomainRequest`.
* Requests must use the same protocol (http:// or https://) as the top-level window.

See [XDomainRequest Limitations](http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx) for more information.

### Known Issues

* IE10 does not send cookies when withCredential=true [IE Bug #759587](https://connect.microsoft.com/IE/feedback/details/759587/ie10-doesnt-support-cookies-on-cross-origin-xmlhttprequest-withcredentials-true).

## API

```
ajax(options [, callback])
```

The ajax method accepts an options object that controls the request behaviour and returns an object containing the underlying transport used for the request.

```
ajax({url: "/api", type: 'json'}, function(response) {
  // ...
});
```

### Options

* `url` The URL to connect to.
* `method` The HTTP method.
* `headers` An object containing HTTP request headers.
* `timeout` A timeout for the request in milliseconds.
* `data` Data to send with the request.
* `type` The expected data type, one of `json`, `jsonp` or `text`.
* `params` Query string parameters to append to the URL.
* `callback` A callback for responses, if the `callback` parameter is specified it overwrites this field.
* `async` Whether the request is asynchronous, default is `true`.
* `parameter` Send the data as the named query string parameter.
* `error` The name of a property of the response object that contains error information, default is `error`.
* `status` The name of a property of the response object that contains a status code, default is `code`.
* `jsonp` The name of the callback query string variable for jsonp requests, default is `callback`.
* `delay` A delay before invoking `send()` in milliseconds (`XDomainRequest` only).
* `mime` A MIME type passed to overrideMimeType(), (`XMLHttpRequest` only).
* `credentials` Authentication credentials (`XMLHttpRequest` only).
* `fields` Properties to apply to the request instance (`XMLHttpRequest` only).

### Return

Invoking `ajax()` returns `false` when the current browser does not support
`JSON`, `XMLHttpRequest` or `XDomainRequest`, otherwise an object is returned
with the following properties:

* `xhr` The underlying transport for the request, will be one of `XMLHttpRequest`, `XDomainRequest` or a `Jsonp` instance.
* `abort` A function thay aborts the request. 
* `cors` A boolean indicating whether the browser supports CORS.
* `ie` Object that determines whether the current browser is Internet Explorer and which version of Internet Explorer is in use.
* `url` The final URL including query string parameters.
* `jsonp` A boolean indicating whether the request was made using `jsonp`.

Note that the return value will also be false if the `options` object is invalid, ie, no options were supplied or an unsupported `type` was specified.

### Response

The `callback` is invoked with a response object that contains the following properties:

* `status` The HTTP response status code.
* `data` The response data, if the type is `jsonp` or `json` this will be the.
decoded javascript object.
* `xhr` A reference to the transport instance used for the request.
* `headers` An object containing response headers, will be `null` when.
response headers are not available. 
* `error` An `Error` instance or `null` if no error occurred.

### ajax.defaults

```
ajax.defaults = {
  method: 'GET',
  timeout: 10000,
  delay: 0,
  async: true,
  parameter: 'packet',
  jsonp: 'callback',
  error: 'error',
  status: 'code',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
}
```

### ajax.jsonp

A reference to the transport used for `jsonp` requests.

### ajax.converters

Exposes the object containing `type` converters. This object may be used to create additional supported types.

```
ajax.converters = {
  text: {
    mime: 'text/plain',
    encode: function(data){return data;},
    decode: function(data){return data;}
  },
  json: {
    mime: 'application/json',
    encode: function(data) {
      return JSON.stringify(data);
    },
    decode: function(data) {
      return JSON.parse(data);
    }
  }
}
```

### ajax.ie

Information about Internet Explorer, for example:

```
ajax.ie = {
  browser: true,
  version: 9
}
```

### Examples

#### JSON GET

```
var opts = {
  url: '/api',
  type: 'json'
};
ajax(opts, function(response) {
  console.log(response);
});
```

#### JSON POST

```
var data = {id: 10};
var opts = {
  url: '/api',
  method: 'POST',
  type: 'json',
  data: data
};
ajax(opts, function(response) {
  console.log(response);
});
```

#### JSONP

Requests using the `jsonp` transport ignore the `method` option as `GET` is the only method available. 

```
var opts = {
  url: '/api',
  type: 'jsonp'
};
ajax(opts, function(response) {
  console.log(response);
});
```

Or to send a JSON and URL-encoded request packet for a JSONP request also specify some data:

```
var data = {id: 10};
var opts = {
  url: '/api',
  type: 'jsonp',
  data: data
};
ajax(opts, function(response) {
  console.log(response);
});
```

The request packet will be sent as the `packet` query string variable, configurable using the `parameter` option.

#### Errors

To handle errors you only need to test the `error` property of the response object, for example:

```
function error(status, err) {
  console.log(status + ": " + err.message);
}
var opts = {url: '/api', type: 'json'};
ajax(opts, function(response) {
  if(response.error) {
    return error(response.status, response.error);
  }
  // ...
});
```

The `error` property of the response object is always an `Error` instance.

#### Abort

You may abort a request by calling the `abort` function of the return object. In the case of the `jsonp` type, this function is a non-operation.

```
var opts = {url: '/api', type: 'json'};
var req = ajax(opts, function(response) {
  // ...
});
req.abort();
```

## Developer

Developer workflow is via [gulp][] but should be executed as `npm` scripts to enable shell execution where necessary.

### Test

Run the headless test suite using [phantomjs][]:

```
npm test
```

To run the tests in a browser context open [test/index.html](https://github.com/socialally/xdr/blob/master/test/index.html) or use the server `npm start`.

### Start

Serve the test files from a web server with:

```
npm start
```

### Cover

Run the test suite and generate code coverage:

```
npm run cover
```

### Lint

Run the source tree through [eslint][]:

```
npm run lint
```

### Clean

Remove generated files:

```
npm run clean
```

### Spec

Compile the test specifications:

```
npm run spec
```

### Instrument

Generate instrumented code from `lib` in `instrument`:

```
npm run instrument
```

### Readme

Generate the project readme file (requires [mdp](https://github.com/tmpfs/mdp)):

```
npm run readme
```

## Appendix

### Simple Headers

When a browser does not support exposing response headers only the following simple headers are accessible:

* Cache-Control.
* Content-Language.
* Content-Type.
* Expires.
* Last-Modified.
* Pragma.

### Related Links

* [XMLHttpRequest2](http://www.w3.org/TR/XMLHttpRequest2/).
* [XMLHttpRequest - Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).
* [CORS](http://www.w3.org/TR/cors/).
* [XDomainRequest](http://msdn.microsoft.com/en-us/library/ie/cc288060%28v=vs.85%29.aspx).
* [XDomainRequest Limitations](http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx).
* [XDomainRequest Quirks](http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/).

Generated by [mdp(1)](https://github.com/tmpfs/mdp).

[mdp]: https://github.com/tmpfs/mdp
