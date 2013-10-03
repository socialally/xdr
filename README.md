# Ajax Implementation

This implementation must support cross domain communication and work in as many browsers as possible including IE8.

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

1. `npm install`
2. `npm start`
3. `npm test` or visit `http://localhost:9080`
