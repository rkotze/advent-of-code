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
      const basin = resolveLowPoint(y, x, list, row[x]);
      if (basin) {
        const [y, x, val] = basin;
        lowest[y + " " + x] = val;
      }
    }
  }

  return Object.values(lowest).reduce((acc, cur) => (acc += cur + 1), 0);
}

function resolveLowPoint(y, x, list, low = 9) {
  let pos = {};
  list[y - 1] != undefined ? (pos[list[y - 1][x]] = [y - 1, x]) : null;
  list[y + 1] != undefined ? (pos[list[y + 1][x]] = [y + 1, x]) : null;
  list[y][x - 1] != undefined ? (pos[list[y][x - 1]] = [y, x - 1]) : null;
  list[y][x + 1] != undefined ? (pos[list[y][x + 1]] = [y, x + 1]) : null;

  const lowest = Object.keys(pos).every((key) => key > low);
  if (!lowest) {
    return null;
  }

  return [y, x, low];
}

console.log(puzzle1());

function puzzle2() {
  const list = readPuzzle("2021", "day9.txt", (data) => {
    return data
      .split(/\n/g)
      .map((row) => row.split("").map((num) => Number(num)));
  });

  const basinSizes = [];

  for (let y = 0; y < list.length; y++) {
    const row = list[y];
    for (let x = 0; x < row.length; x++) {
      const lowPoint = resolveLowPoint(y, x, list, row[x]);
      if (lowPoint) {
        const [y, x, _] = lowPoint;
        basinSizes.push(basinSize(y, x, list));
      }
    }
  }

  return basinSizes
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((acc, cur) => acc * cur, 1);
}

function basinSize(y, x, list) {
  const basin = [];
  const queue = [[y, x]];

  while (queue.length > 0) {
    const [y, x] = queue.pop();
    const val = nodeValue(y, x, list);
    const key = nodeKey(y, x);
    if (val < 9 && !basin.includes(key)) {
      basin.push(key);
      queue.push([y - 1, x]);
      queue.push([y + 1, x]);
      queue.push([y, x - 1]);
      queue.push([y, x + 1]);
    }
  }
  return basin.length;
}

function nodeKey(y, x) {
  return y + " " + x;
}

function nodeValue(y, x, list) {
  const valY = list[y];
  if (valY === undefined) return 9;
  let valX = valY[x];
  if (valX === undefined) return 9;

  return valX;
}

console.log(puzzle2());
