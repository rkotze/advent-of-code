const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const list = readPuzzle("2021", "day9.txt", (data) => {
    return data
      .split(/\n/g)
      .map((row) => row.split("").map((num) => Number(num)));
  });

  const lowest = {};

  for (let y = 0; y < list.length; y++) {
    const row = list[y];
    for (let x = 0; x < row.length; x++) {
      const basin = resolveBasin(y, x, list, row[x]);
      if (basin) {
        const [key, val] = basin;
        lowest[key] = val;
      }
    }
  }

  return Object.values(lowest).reduce((acc, cur) => (acc += cur + 1), 0);
}

function resolveBasin(y, x, list, low = 9) {
  let pos = {};
  list[y - 1] != undefined ? (pos[list[y - 1][x]] = [y - 1, x]) : null;
  list[y + 1] != undefined ? (pos[list[y + 1][x]] = [y + 1, x]) : null;
  list[y][x - 1] != undefined ? (pos[list[y][x - 1]] = [y, x - 1]) : null;
  list[y][x + 1] != undefined ? (pos[list[y][x + 1]] = [y, x + 1]) : null;

  const lowest = Object.keys(pos).every((key) => key > low);
  if (!lowest) {
    return null;
  }

  return [y + " " + x, low];
}

console.log(puzzle1());
