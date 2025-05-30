const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const reports = readPuzzle("2024", "day2.txt");
  let countSafe = 0;
  for (let i = 0; i < reports.length; i++) {
    const levels = reports[i].split(" ").map((num) => Number(num));
    let isLessThan = null;
    for (let j = 0; j < levels.length - 1; j++) {
      const levelLeft = levels[j];
      const levelRight = levels[j + 1];

      const diff = Math.abs(levelLeft - levelRight);
      if (diff === 0 || diff > 3) {
        break;
      }

      if (isLessThan === null) {
        isLessThan = levelLeft < levelRight;
        continue;
      } else if (isLessThan !== levelLeft < levelRight) {
        break;
      }

      if (j === levels.length - 2) {
        countSafe += 1;
      }
    }
  }
  return countSafe;
}

console.log(puzzle1());
