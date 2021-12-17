const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const list = readPuzzle("2021", "day5.txt", (data) => {
    const lines = data.split(/\n/g);
    return lines.map((line) => {
      return line.split(/\s->\s/g);
    });
  });

  const path = new Map();

  for (const [start, end] of list) {
    const [x1s, y1s] = start.split(",");
    const [x2s, y2s] = end.split(",");
    const x1 = Number(x1s);
    const x2 = Number(x2s);
    const y1 = Number(y1s);
    const y2 = Number(y2s);
    if (x1 === x2) {
      const yStart = Math.min(y1, y2);
      const yEnd = Math.max(y1, y2);
      for (let i = yStart; i <= yEnd; i++) {
        let key = `${x1}:${i}`;
        let val = path.get(key) || 0;
        path.set(key, val + 1);
      }
    }

    if (y1 === y2) {
      const xStart = Math.min(x1, x2);
      const xEnd = Math.max(x1, x2);
      for (let i = xStart; i <= xEnd; i++) {
        let key = `${i}:${y1}`;
        let val = path.get(key) || 0;
        path.set(key, val + 1);
      }
    }
  }

  return Array.from(path.values()).filter((val) => val >= 2).length;
}

console.log(puzzle1());

function puzzle2() {
  const list = readPuzzle("2021", "day5.txt", (data) => {
    const lines = data.split(/\n/g);
    return lines.map((line) => {
      return line.split(/\s->\s/g);
    });
  });

  const path = new Map();

  for (const [starts, ends] of list) {
    const [x1s, y1s] = starts.split(",");
    const [x2s, y2s] = ends.split(",");
    const x1 = Number(x1s);
    const x2 = Number(x2s);
    const y1 = Number(y1s);
    const y2 = Number(y2s);
    let start = [x1, y1];
    let end = [x2, y2];

    countOverlap(start, path);
    do {
      start = step(start, end);
      countOverlap(start, path);
    } while (!hasTraveled(start, end));
  }

  return Array.from(path.values()).filter((val) => val >= 2).length;
}

console.log(puzzle2());

function countOverlap(start, path) {
  const [kx1, ky1] = start;
  let key = `${kx1}:${ky1}`;
  let val = path.get(key) || 0;
  path.set(key, val + 1);
}

function step(start, end) {
  const [x1, y1] = start;
  const [x2, y2] = end;
  let x = x1 < x2 ? x1 + 1 : x1 - 1;
  let y = y1 < y2 ? y1 + 1 : y1 - 1;
  if (x1 === x2) x = x1;
  if (y1 === y2) y = y1;
  return [x, y];
}

function hasTraveled(start, end) {
  const [x1, y1] = start;
  const [x2, y2] = end;
  return x1 === x2 && y1 === y2;
}
