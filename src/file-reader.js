const fs = require("fs");
const path = require("path");

function fileReader(filename) {
  return fs.readFileSync(path.join(__dirname, "./data", filename), {
    encoding: "utf8",
  });
}

exports.fileReader = fileReader;
