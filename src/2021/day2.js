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
