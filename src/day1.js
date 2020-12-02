var fs = require("fs");
var path = require("path");

function puzzle1() {
  const list = fetchData();
  for (const num1 of list) {
    for (const num2 of list) {
      const val = multiplyWhen2020(Number(num1), Number(num2));
      if(val > 0) return val;
    }
  }
  return 0;
}

function puzzle2() {
  const list = fetchData();
  for (const num1 of list) {
    for (const num2 of list) {
      for (const num3 of list) {
        const val = multiplyWhen2020(Number(num1), Number(num2), Number(num3));
        if(val > 0) return val
      }
    }
  }
  return 0;
}

function multiplyWhen2020(...values){
  const total = values.reduce((total, cur) => total + cur, 0);
  if(total === 2020){
    return values.reduce((total, cur) => total * cur, 1);
  }
  return 0;
}

function fetchData() {
  const data = fs.readFileSync(path.join(__dirname, "./data/day.txt"), { encoding: 'utf8' });
  const list = data.split("\n");
  return list;
}

exports.puzzle1 = puzzle1;
exports.puzzle2 = puzzle2;

