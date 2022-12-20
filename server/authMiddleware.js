const jwt = require("jsonwebtoken");

const APP_SECRET = "supersecret";
const USERNAME = "admin";
const PASSWORD = "secret";

const mappings = {
  get: ["/api/orders", "/orders"],
  post: ["/api/products", "/products", "/api/categories", "/categories"],
};

const requiresAuth = (method, url) =>
  !!(mappings[method.toLowerCase()] || []).find((x) => url.startsWith(x));

module.exports = (req, res, next) => {
  if (req.url.endsWith("/login") && req.method === "POST") {
    if (
      req.body &&
      req.body.name === USERNAME &&
      req.body.password === PASSWORD
    ) {
      const token = jwt.sign({ data: USERNAME, expiresIn: "1h" }, APP_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false });
    }
    res.end();
    return;
  } else if (requiresAuth(req.method, req.url)) {
    const tokenH = req.headers["authorization"] || "";
    if (tokenH.startsWith("Bearer<")) {
      const token = tokenH.substring(7, tokenH.length - 1);
      try {
        jwt.verify(token, APP_SECRET);
        next();
        return;
      } catch (err) {}
    }
    res.statusCode = 401;
    res.end();
    return;
  }
  next();
};
