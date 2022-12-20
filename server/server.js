const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const history = require("connect-history-api-fallback");
const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const auth = require("./authMiddleware");

const enableHttps = false;
const sslOptions = {};
const router = jsonServer.router(path.join(__dirname, "serverdata.json"));

if (enableHttps) {
  sslOptions.cert = fs.readFileSync(
    path.join(__dirname, "ssl/sportsstore.crt")
  );
  sslOptions.key = fs.readFileSync(path.join(__dirname, "ssl/sportsstore.pem"));
}

const app = express();
app.use(bodyParser.json());
app.use(auth);
app.use("/api", router);
app.use(history());
app.use("/", express.static(path.join(__dirname, "../dist/sports-store")));

app.listen(80, () => console.log("HTTP Server running on port 80"));

if (enableHttps) {
  https
    .createServer(sslOptions, app)
    .listen(443, () => console.log("HTTPS Server running on port 443"));
} else {
  console.log("HTTPS disabled");
}
