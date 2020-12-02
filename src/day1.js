var fs = require("fs");
var path = require("path");

function puzzle1() {
  const data = fs.readFileSync(path.join(__dirname, "./data/day.txt"), { encoding: 'utf8'});
  const list = data.split("\n");
  let result = 0;
  for (const num1 of list) {
    for (const num2 of list) {
      const first = Number(num1)
      const second = Number(num2);
      if((first + second) === 2020){
        result = first * second;
      }
    }
  }
  return result;
}

exports.puzzle1 = puzzle1;
