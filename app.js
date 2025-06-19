var express = require("express");
var Unblocker = require("unblocker");
var app = express();

var unblockerConfig = {
  prefix: "/proxy/",
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
