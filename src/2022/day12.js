const { readPuzzle } = require("../file-reader");

function charVal(char) {
  const list = "abcdefghijklmnopqrstuvwxyz?";
  return list.indexOf(char);
}

function puzzle1() {
  const grid = readPuzzle("2022", "day12.txt", (data) => {
    return data.split(/\n/g).map((str) => str.split(""));
  });

  //20, 0
  const end = "E";
  const visited = new Set();
  const queue = [{ val: "a", row: 20, col: 0, count: 1 }];

  while (queue.length > 0) {
    const { val, row, col, count } = queue.shift();

    const right = grid[row][col + 1] || "?";
    const left = grid[row][col - 1] || "?";
    const top = grid[row - 1] ? grid[row - 1][col] : "?";
    const bottom = grid[row + 1] ? grid[row + 1][col] : "?";
    if (
      val == "z" &&
      (left == end || right == end || top == end || bottom == end)
    )
      return count;

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
