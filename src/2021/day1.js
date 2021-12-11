const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const list = readPuzzle("2021", "day1.txt");
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

function puzzle2() {
  const list = readPuzzle("2021", "day1.txt");
  let count = 0;
  let previousNum = 0;
  let groupBy3 = [];
  for (let index = 0; index < list.length - 2; index++) {
    groupBy3.push(
      Number(list[index]) + Number(list[index + 1]) + Number(list[index + 2])
    );
  }
  for (const num of groupBy3) {
    let depth = Number(num);
    if (previousNum !== 0 && depth > previousNum) {
      count++;
    }
    previousNum = depth;
  }
  return count;
}

console.log(puzzle2());
