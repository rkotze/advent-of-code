const { readPuzzle } = require("../file-reader");

function priority(char) {
  const list = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return list.indexOf(char) + 1;
}

function puzzle1() {
  const data = readPuzzle("2022", "day3.txt");
  let total = 0;
  for (const bag of data) {
    const first = bag.substring(0, bag.length / 2).split("");
    const second = bag.substring(bag.length / 2).split("");
    for (const secChar of second) {
      if (first.some((char) => secChar === char)) {
        total += priority(secChar);
        break;
      }
    }
  }
  return total;
}

console.log(puzzle1());
