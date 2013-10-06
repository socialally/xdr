# ajax(options [, callback])

The ajax method accepts an options object that controls the request behaviour and returns an object containing the underlying transport used for the request.

```
ajax({url: "/api", type: 'json'}, function(response) {
  // ...
});
```

## Options

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
*  `status` The name of a property of the response object that contains a status code, default is `code`.
* `jsonp` The name of the callback query string variable for jsonp requests, default is `callback`.
* `delay` A delay before invoking `send()` in milliseconds (`XDomainRequest` only).
* `mime` A MIME type passed to overrideMimeType(), (`XMLHttpRequest` only).
* `credentials` Authentication credentials (`XMLHttpRequest` only).
* `fields` Properties to apply to the request instance (`XMLHttpRequest` only).

## Return

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

## Response

The `callback` is invoked with a response object that contains the following properties:

* `status` The HTTP response status code.
* `data` The response data, if the type is `jsonp` or `json` this will be the
  decoded javascript object.
* `xhr` A reference to the transport instance use for the request.
* `headers` An object containing response headers, will be `null` when
  response headers are not available. 
* `error` An `Error` instance or `null` if no error occurred.

## ajax.defaults

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

## ajax.jsonp

A reference to the transport used for `jsonp` requests.

## ajax.converters

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

## ajax.ie

Information about Internet Explorer, for example:

```
ajax.ie = {
  browser: true,
  version: 9
}
```

## Examples

### JSON GET

```
var opts = {
  url: '/api',
  type: 'json'
};
ajax(opts, function(response) {
  console.log(response);
});
```

### JSON POST

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

### JSONP

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

The request packet will be sent as the `packet` query string variable,
configurable using the `parameter` option.
