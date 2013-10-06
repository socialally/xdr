# ajax(options [, callback])

The ajax method accepts an options object that controls the request behaviour and returns an object containing the underlying transport used for the request.

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

## Defaults

```
ajax.defaults = {
  method: 'GET',
  timeout: 10000,
  delay: 0,
  async: true,
  parameter: 'packet',
  jsonp: 'callback',
  error: 'error',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
}
```
