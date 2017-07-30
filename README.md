# Kubernetes with CORS

This is a basic project that shows the implementation of a k8s cluster with a webpage frontend that interacts with a backend using CORS (both preflight and no preflight)

### Setup
---
Have a headless chrome connect to a server running our webappthen have that headless chrome click a buttton that sends a http request (cors preflight), or have a button for no preflight.

For the client, have a webpage, maybe it needs to be served from an http server.

For the server, have an http server waiting as well, when the endpoint /preflight or the endpoint /no-preflight is requested send back a json object (stringified for no preflight)


### TODO
---
- Check that backend middleware is working
- Frontend serve a file with 2 buttons that hit backend
- Fix virtualbox like always
- Create Ingress for frontend
- Chrome debug protocol to click 2 buttons and recieve correct responses
