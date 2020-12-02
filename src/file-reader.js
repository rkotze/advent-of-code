const fs = require("fs");
const path = require("path");

function fileReader(filename) {
  const data = fs.readFileSync(path.join(__dirname, "./data", filename), {
    encoding: "utf8",
  });
  return data.split("\n");
}

exports.fileReader = fileReader;
