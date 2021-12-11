const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const list = readPuzzle("2021", "day3.txt");
  let countCollection = Array.from(Array(list[0].length), () => [0, 0]);
  for (const binary of list) {
    for (let i = 0; i < binary.length; i++) {
      const bit = Number(binary[i]);
      countCollection[i][bit]++;
    }
  }

  let gamma = "";
  let epsilon = "";
  for (const bitCount of countCollection) {
    if (bitCount[0] > bitCount[1]) {
      gamma += "0";
      epsilon += "1";
    } else {
      gamma += "1";
      epsilon += "0";
    }
  }

  const gammaD = parseInt(gamma, 2);
  const epsilonD = parseInt(epsilon, 2);
  return gammaD * epsilonD;
}

console.log(puzzle1());
