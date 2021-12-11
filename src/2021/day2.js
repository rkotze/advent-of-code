const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const list = readPuzzle("2021", "day2.txt");
  let h = 0;
  let d = 0;
  for (const instruction of list) {
    const [direction, unit] = instruction.split(/\s/g);
    if (direction === "forward") {
      h += Number(unit);
    }
    if (direction === "down") {
      d += Number(unit);
    }
    if (direction === "up") {
      d -= Number(unit);
    }
  }
  return h * d;
}

console.log(puzzle1());

function puzzle2() {
  const list = readPuzzle("2021", "day2.txt");
  let h = 0;
  let d = 0;
  let aim = 0;
  for (const instruction of list) {
    const [direction, unit] = instruction.split(/\s/g);
    const v = Number(unit);
    if (direction === "forward") {
      h += v;
      if (aim !== 0) d += aim * v;
    }
    if (direction === "down") {
      aim += v;
    }
    if (direction === "up") {
      aim -= v;
    }
  }
  return h * d;
}

console.log(puzzle2());
