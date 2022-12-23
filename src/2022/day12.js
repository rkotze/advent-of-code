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

  while (queue.length > 0) {
    const { val, row, col, count } = queue.shift();

    if (val == end) return count;

    const right = grid[row][col + 1] || "?";
    const left = grid[row][col - 1] || "?";
    const top = grid[row - 1] ? grid[row - 1][col] : "?";
    const bottom = grid[row + 1] ? grid[row + 1][col] : "?";

    const nextVal = charVal(val) + 1;
    let nextKey = row + ":" + (col - 1);
    if (!visited.has(nextKey) && charVal(left) <= nextVal) {
      visited.add(nextKey);
      queue.push({ val: left, row, col: col - 1, count: count + 1 });
    }

    nextKey = row + ":" + (col + 1);
    if (!visited.has(nextKey) && charVal(right) <= nextVal) {
      visited.add(nextKey);
      queue.push({ val: right, row, col: col + 1, count: count + 1 });
    }

    nextKey = row + 1 + ":" + col;
    if (!visited.has(nextKey) && charVal(bottom) <= nextVal) {
      visited.add(nextKey);
      queue.push({ val: bottom, row: row + 1, col: col, count: count + 1 });
    }

    nextKey = row - 1 + ":" + col;
    if (!visited.has(nextKey) && charVal(top) <= nextVal) {
      visited.add(nextKey);
      queue.push({ val: top, row: row - 1, col: col, count: count + 1 });
    }
  }

  return -1;
}

console.log(puzzle1());

function puzzle2() {
  const grid = readPuzzle("2022", "day12.txt", (data) => {
    return data.split(/\n/g).map((str) => str.split(""));
  });

  const end = "E";
  const visited = new Set();
  const queue = [];

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

    const right = grid[row][col + 1] || "?";
    const left = grid[row][col - 1] || "?";
    const top = grid[row - 1] ? grid[row - 1][col] : "?";
    const bottom = grid[row + 1] ? grid[row + 1][col] : "?";

    const nextVal = charVal(val) + 1;
    let nextKey = row + ":" + (col - 1);
    if (!visited.has(nextKey) && charVal(left) <= nextVal) {
      visited.add(nextKey);
      const isA = left == "a";
      queue.push({ val: left, row, col: col - 1, count: isA ? 0 : count + 1 });
    }

    nextKey = row + ":" + (col + 1);
    if (!visited.has(nextKey) && charVal(right) <= nextVal) {
      visited.add(nextKey);
      const isA = right == "a";
      queue.push({
        val: right,
        row,
        col: col + 1,
        count: isA ? 0 : count + 1,
      });
    }

    nextKey = row + 1 + ":" + col;
    if (!visited.has(nextKey) && charVal(bottom) <= nextVal) {
      visited.add(nextKey);
      const isA = bottom == "a";
      queue.push({
        val: bottom,
        row: row + 1,
        col: col,
        count: isA ? 0 : count + 1,
      });
    }

    nextKey = row - 1 + ":" + col;
    if (!visited.has(nextKey) && charVal(top) <= nextVal) {
      visited.add(nextKey);
      const isA = top == "a";
      queue.push({
        val: top,
        row: row - 1,
        col: col,
        count: isA ? 0 : count + 1,
      });
    }
  }

  return -1;
}

console.log(puzzle2());
