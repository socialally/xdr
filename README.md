# Ajax Implementation

An AMD compatible cross-browser, cross-domain Ajax implementation. 

Run `npm install` to resolve dependencies.

## Design Goals

* Must support IE 8/9.
* Must be able to load resources cross-domain.
* Must support text, json, and jsonp.
* Must be as lightweight as possible, ~4KB minified.

Use this library if you need to support IE8 and want robust error handling by convention. Requires server-side code to respond following the convention for overriding the response status code and error messages.

## Documentation

See the [api documentation](doc/md/api.md).

## Test

Map the domain `xdomain.socialal.ly` in `/etc/hosts`:

```
127.0.0.1     xdomain.socialal.ly
```

And configure a reverse proxy, an example for [nginx](http://nginx.org) is available as [xdomain.socialal.ly.conf](conf/xdomain.socialal.ly.conf).

Then run the tests in a browser:

1. `npm start` - Start the mock server.
2. Visit `http://localhost:9080`

Note that IE8 is not supported by [chai](http://chaijs.com/) so in order to test you need to visit:

```
http://localhost:9080/standalone.html
```

## Minify

To create a minified version of the library run `npm run minify`.

## Server Implementation

The server must at a minimum send the appropriate headers for CORS support, see [server.js](lib/server.js) for example headers.

In addition, in order to support the `XDomainRequest` object for IE 8/9 the server must process requests *that do not contain a Content-Type header* and the client must know the type of data the server responds with. 

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

## Appendix

### Simple Headers

When a browser does not support exposing response headers only the following simple headers are accessible:

* Cache-Control
* Content-Language
* Content-Type
* Expires
* Last-Modified
* Pragma

### Related Links

* [XMLHttpRequest2](http://www.w3.org/TR/XMLHttpRequest2/)
* [XMLHttpRequest - Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
* [CORS](http://www.w3.org/TR/cors/)
* [XDomainRequest](http://msdn.microsoft.com/en-us/library/ie/cc288060%28v=vs.85%29.aspx)
* [XDomainRequest Limitations](http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx)
* [XDomainRequest Quirks](http://cypressnorth.com/programming/internet-explorer-aborting-ajax-requests-fixed/)
