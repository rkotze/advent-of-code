const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const data = readPuzzle("2022", "day1.txt");
  const groups = [0];
  for (const num1 of data) {
    if (num1.length > 0) {
      const pos = groups.length - 1;
      groups[pos] += Number(num1);
    } else {
      groups.push(0);
    }
  }
  return Math.max(...groups);
}

console.log(puzzle1());

function puzzle2() {
  const data = readPuzzle("2022", "day1.txt");
  const groups = [0];
  for (const num1 of data) {
    if (num1.length > 0) {
      const pos = groups.length - 1;
      groups[pos] += Number(num1);
    } else {
      groups.push(0);
    }
  }
  groups.sort((a, b) => b - a);
  let total = 0;
  for (let i = 0; i < 3; i++) {
    total += groups[i];
  }

  return total;
}

console.log(puzzle2());
