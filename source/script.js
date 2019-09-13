var path = require("path");
var fs = require("fs-extra");

fs.copy("./build", "../", err => {
  if (err) return console.error(err);

  console.log("success!");
});