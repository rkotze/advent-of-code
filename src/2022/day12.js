const assert = require("assert");
const { readPuzzle } = require("../file-reader");

function charVal(char) {
  const list = "abcdefghijklmnopqrstuvwxyzE?";
  return list.indexOf(char);
}

function puzzle1() {
  const grid = readPuzzle("2022", "day12.txt", (data) => {
    return data.split(/\n/g).map((str) => str.split(""));
  });

  //20, 0
  const end = "E";
  const visited = new Set("20:0");
  const queue = [{ val: "a", row: 20, col: 0, count: 0 }];
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const rowLength = grid.length;
  const colLength = grid[0].length;

  while (queue.length > 0) {
    const { val, row, col, count } = queue.shift();

    if (val == end) return count;

    const nextVal = charVal(val) + 1;
    for (const [addRow, addCol] of directions) {
      const newRow = row + addRow;
      const newCol = col + addCol;
      if (
        newRow < 0 ||
        newRow >= rowLength ||
        newCol < 0 ||
        newCol >= colLength
      )
        continue;
      const cell = grid[newRow][newCol];
      let nextKey = newRow + ":" + newCol;
      if (!visited.has(nextKey) && charVal(cell) <= nextVal) {
        visited.add(nextKey);
        queue.push({ val: cell, row: newRow, col: newCol, count: count + 1 });
      }
    }
  }

  return -1;
}

const p1 = puzzle1();
console.log(p1);
assert(p1 === 490);

function puzzle2() {
  const grid = readPuzzle("2022", "day12.txt", (data) => {
    return data.split(/\n/g).map((str) => str.split(""));
  });

  const end = "E";
  const visited = new Set();
  const queue = [];
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const rowLength = grid.length;
  const colLength = grid[0].length;

  for (let i = 0; i < grid.length; i++) {
    const r = grid[i];
    for (let j = 0; j < r.length; j++) {
      const c = r[j];
      if (c == "S" || c == "a") {
        queue.push({ val: "a", row: i, col: j, count: 0 });
      }
    }
  }

  while (queue.length > 0) {
    const { val, row, col, count } = queue.shift();

    if (val == end) return count;

    const nextVal = charVal(val) + 1;
    for (const [addRow, addCol] of directions) {
      const newRow = row + addRow;
      const newCol = col + addCol;
      if (
        newRow < 0 ||
        newRow >= rowLength ||
        newCol < 0 ||
        newCol >= colLength
      )
        continue;
      const cell = grid[newRow][newCol];
      let nextKey = newRow + ":" + newCol;
      if (!visited.has(nextKey) && charVal(cell) <= nextVal) {
        visited.add(nextKey);
        const isA = cell == "a";
        queue.push({
          val: cell,
          row: newRow,
          col: newCol,
          count: isA ? 0 : count + 1,
        });
      }
    }
  }

  return -1;
}

const p2 = puzzle2();
console.log(p2);
assert(p2 === 488);
