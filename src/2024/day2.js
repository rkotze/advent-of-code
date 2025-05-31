const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const reports = readPuzzle("2024", "day2.txt");
  let countSafe = 0;
  for (let i = 0; i < reports.length; i++) {
    const levels = reports[i].split(" ").map((num) => Number(num));
    if (isValid(levels)) {
      countSafe += 1;
    }
  }
  return countSafe;
}

function isValid(levels) {
  let isLessThan = levels[0] < levels[1];
  for (let j = 0; j < levels.length - 1; j++) {
    const levelLeft = levels[j];
    const levelRight = levels[j + 1];

    const diff = Math.abs(levelLeft - levelRight);
    if (diff === 0 || diff > 3) {
      return false;
    }

    if (isLessThan !== levelLeft < levelRight) {
      return false;
    }
  }
  return true;
}

console.log(puzzle1());

function puzzle2() {
  const reports = readPuzzle("2024", "day2.txt");
  let countSafe = 0;
  for (let i = 0; i < reports.length; i++) {
    const levels = reports[i].split(" ").map((num) => Number(num));
    if (isValid(levels)) {
      countSafe += 1;
    } else {
      for (let j = 0; j < levels.length; j++) {
        const testList = levels.slice(0, j).concat(levels.slice(j + 1));
        if (isValid(testList)) {
          countSafe += 1;
          break;
        }
      }
    }
  }
  return countSafe;
}

console.log(puzzle2());
