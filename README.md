# Ajax Implementation

This implementation must support cross domain communication and work in as many browsers as possible including IE8.

Run `npm install` to resolve dependencies.

## Test

Map the domain `xdomain.socialal.ly` in `/etc/hosts`:

```
127.0.0.1     xdomain.socialal.ly
```

And configure a reverse proxy, for example using [nginx](http://nginx.org):

```
server {
  listen       80;
  server_name  xdomain.socialal.ly;
  location / {
    proxy_redirect      off;
    proxy_set_header    Host            $host;
    proxy_set_header    X-Real-IP       $remote_addr;
    proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:9080;
  }
}
```

Then run the tests in a browser:

1. `npm start` - Start the mock server.
2. Visit `http://localhost:9080`

## Browser Compatibility

Browsers marked with an asterisk have partial support:

* Chrome 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 beta, 31 dev
* Firefox 21, 22, 23, 24, 25 beta, 25 aurora
* Opera 12.16 - 16.0.1196.80, 17.0 next, 18.0 dev
* Safari 6.0.5 (8536.30.1)

* Safari 5.1.10 (6534.59.10) *
* Chrome 14, 16, 17 *

## Partial Support

* Firefox 4-20 do not expose cross domain response headers using `getAllResponseHeaders()`.
* Safari 5/5.1, Chrome 14, 16 ,17 do not respect the `Access-Control-Expose-Headers` response header so assertions fail on the response headers.
* Response headers are not available to IE browsers using the `XDomainRequest` object.
* The `async` option is ignored for `XDomainRequest` instances.
* Authentication credentials may not be used with `XDomainRequest`.
* IE10 does not send cookies when withCredential=true [IE Bug #759587](https://connect.microsoft.com/IE/feedback/details/759587/ie10-doesnt-support-cookies-on-cross-origin-xmlhttprequest-withcredentials-true)

## Appendix

### Simple Headers

When a browser does not support exposing response headers only the following
simple headers are accessible:

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
* [test-cors.org](http://test-cors.org)
* [express+cors](https://npmjs.org/package/cors)
* [jquery+ajax](http://api.jquery.com/jQuery.ajax/)
