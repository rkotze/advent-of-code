const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const data = readPuzzle("2021", "day1.txt");
  const list = data.split("\n");
  let count = 0;
  let previousNum = 0;
  for (const num of list) {
    let depth = Number(num);
    if (previousNum !== 0 && depth > previousNum) {
      count++;
    }
    previousNum = depth;
  }
  return count;
}

console.log(puzzle1());
