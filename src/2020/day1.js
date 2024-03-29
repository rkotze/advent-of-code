const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const data = readPuzzle("2020", "day1.txt");
  const list = data.split("\n");
  for (const num1 of list) {
    for (const num2 of list) {
      const val = multiplyWhen2020(Number(num1), Number(num2));
      if (val > 0) return val;
    }
  }
  return 0;
}

function puzzle2() {
  const data = readPuzzle("2020", "day1.txt");
  const list = data.split("\n");
  for (const num1 of list) {
    for (const num2 of list) {
      for (const num3 of list) {
        const val = multiplyWhen2020(Number(num1), Number(num2), Number(num3));
        if (val > 0) return val;
      }
    }
  }
  return 0;
}

function multiplyWhen2020(...values) {
  const total = values.reduce((total, cur) => total + cur, 0);
  if (total === 2020) {
    return values.reduce((total, cur) => total * cur, 1);
  }
  return 0;
}

console.log(puzzle1());
console.log(puzzle2());
