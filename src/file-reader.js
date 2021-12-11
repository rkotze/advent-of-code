const fs = require("fs");
const path = require("path");

function fileReader(filePath) {
  return fs.readFileSync(filePath, {
    encoding: "utf8",
  });
}

function readPuzzle(year, filename) {
  const puzzleData = path.join(__dirname, year, "data", filename);
  return fileReader(puzzleData);
}

function envVars() {
  const envText = fileReader(path.join(__dirname, "../.env"));
  const list = envText.split("\n");
  return list.reduce((acc, envRaw) => {
    const [key, value] = envRaw.split("=");
    acc[key] = value;
    return acc;
  }, {});
}

exports.fileReader = fileReader;
exports.readPuzzle = readPuzzle;
exports.envVars = envVars;
