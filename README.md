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

Browsers marked with an asterisk have caveats:

* Chrome 31.0.1650.4 dev
* Firefox 24.0
* Safari 5.1.10 (6534.59.10) *

## Caveats

* Safari 5 does not respect the `Access-Control-Expose-Headers` response header so assertions fail on the response headers.
