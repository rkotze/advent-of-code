const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const data = readPuzzle("2023", "day1.txt");
  let total = 0;
  for (const newDesign of data) {
    const nums = newDesign.match(/\d/g);
    total += Number(nums.at(0) + nums.at(-1));
  }

  return total;
}

console.log(puzzle1());

function puzzle2() {
  const data = readPuzzle("2023", "day1.txt");
  let total = 0;
  for (const newDesign of data) {
    const newFormat = updateWords(newDesign);
    const nums = newFormat.match(/\d/g);
    total += Number(nums.at(0) + nums.at(-1));
  }

  return total;
}

console.log(puzzle2());

function updateWords(str) {
  const word2num = {
    one: "o1e",
    two: "t2o",
    three: "t3e",
    four: "f4r",
    five: "f5e",
    six: "s6x",
    seven: "s7n",
    eight: "e8t",
    nine: "n9e",
  };

  const keys = Object.keys(word2num);
  for (const key of keys) {
    str = str.replace(new RegExp(key, "gi"), word2num[key]);
  }
  return str;
}
