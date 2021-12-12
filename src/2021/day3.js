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

function puzzle2() {
  const list = readPuzzle("2021", "day3.txt");

  let o2 = binarySieve(list, 0, (counts) => {
    if (counts[0] > counts[1]) return 0;
    else return 1;
  });
  let co2 = binarySieve(list, 0, (counts) => {
    if (counts[0] > counts[1]) return 1;
    else return 0;
  });

  const o2D = parseInt(o2, 2);
  const co2D = parseInt(co2, 2);
  return o2D * co2D;
}

function binarySieve(list, col, predicate) {
  if (list.length === 1) return list[0];

  let countCollection = Array.from(Array(2), () => 0);
  let binaryCollection = Array.from(Array(2), () => []);
  for (const binary of list) {
    for (let i = col; i < binary.length; i++) {
      const bit = Number(binary[i]);
      countCollection[bit]++;
      binaryCollection[bit].push(binary);
      i = binary.length;
    }
  }

  return binarySieve(
    binaryCollection[predicate(countCollection)],
    col + 1,
    predicate
  );
}

console.log(puzzle2());
