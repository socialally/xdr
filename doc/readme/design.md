## Design Goals

* Must support IE 8/9.
* Must be able to load resources cross-domain.
* Must support text, json, and jsonp.
* Must be as lightweight as possible, ~4KB minified.

Use this library if you need to support IE8 (cross-domain) and want robust error handling by convention. Requires server-side code to respond following the convention for overriding the response status code and error messages see the [server implementation](#server-implementation) notes.

## Server Implementation

The server must at a minimum send the appropriate headers for CORS support, see [server.js](lib/server.js) for example headers.

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

* IE10 does not send cookies when withCredential=true [IE Bug #759587](https://connect.microsoft.com/IE/feedback/details/759587/ie10-doesnt-support-cookies-on-cross-origin-xmlhttprequest-withcredentials-true)
