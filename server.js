const express = require("express");
const next = require("next");
const vhost = require("vhost");

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const mainServer = express();

  const customerServer = express();
  const ownerServer = express();

  customerServer.get("/", (req, res) => {
    return app.render(req, res, "/customer", req.query);
  });
  customerServer.get("/*", (req, res) => {
    return app.render(req, res, `/customer${req.path}`, req.query);
  });
  customerServer.all("*", (req, res) => {
    return handle(req, res);
  });

  ownerServer.get("/", (req, res) => {
    return app.render(req, res, "/owner", req.query);
  });
  ownerServer.get("/*", (req, res) => {
    return app.render(req, res, `/owner${req.path}`, req.query);
  });
  ownerServer.all("*", (req, res) => {
    return handle(req, res);
  });

  mainServer.use(vhost("dangol.store", customerServer));
  mainServer.use(vhost("owner.dangol.store", ownerServer));

  mainServer.listen(port, (err) => {
    if (err) throw err;
  });
});
