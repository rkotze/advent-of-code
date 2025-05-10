const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const data = readPuzzle("2024", "day1t.txt", (data) => {
    const twoNums = [[], []];
    data.split(/\n/g).forEach((twoCols) => {
      const [one, two] = twoCols.split(/\s+/g);
      twoNums[0].push(Number(one));
      twoNums[1].push(Number(two));
    });
    twoNums[0].sort((a, b) => a - b);
    twoNums[1].sort((a, b) => a - b);
    return twoNums;
  });

  let total = 0;
  for (let i = 0; i < data[0].length; i++) {
    let left = data[0][i];
    let right = data[1][i];

    total += Math.abs(left - right);
  }
  return total;
}

console.log(puzzle1());
