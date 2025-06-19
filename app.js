var express = require("express");
var Unblocker = require("unblocker");
var app = express();

var unblockerConfig = {
  prefix: "/proxy/",
   requestMiddleware: [
    (req, ctx, callback) => {
      // Headers mais realistas, como se fosse um Chrome no Windows
      req.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';
      req.headers['accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8';
      req.headers['accept-language'] = 'en-US,en;q=0.9';
      req.headers['accept-encoding'] = 'gzip, deflate, br';
      req.headers['upgrade-insecure-requests'] = '1';
      req.headers['connection'] = 'keep-alive';
      // Caso o site exija, pode setar um Referer fake:
      req.headers['referer'] = 'https://www.google.com/';

      callback();
    }
  ]
};

var unblocker = new Unblocker(unblockerConfig);
app.use(unblocker);
app.use("/", express.static(__dirname + "/public"));

const port = process.env.PORT || process.env.VCAP_APP_PORT || 8080;

app
  .listen(port, function () {
    console.log(
      `node unblocker process listening at http://localhost:${port}/`
    );
  })
  .on("upgrade", unblocker.onUpgrade);
