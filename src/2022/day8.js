const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const forest = readPuzzle("2022", "day8.txt", (data) => {
    return data
      .split(/\n/g)
      .map((str) => str.split("").map((strNum) => Number(strNum)));
  });

  const edges = forest.length * 4 - 4;
  let visibleCount = 0;
  for (let i = 1; i < forest.length - 1; i++) {
    const row = forest[i];
    for (let j = 1; j < row.length - 1; j++) {
      if (right(forest, [i, j], [i, j + 1])) {
        visibleCount++;
        continue;
      }
      if (left(forest, [i, j], [i, j - 1])) {
        visibleCount++;
        continue;
      }
      if (top(forest, [i, j], [i - 1, j])) {
        visibleCount++;
        continue;
      }
      if (bottom(forest, [i, j], [i + 1, j])) {
        visibleCount++;
        continue;
      }
    }
  }

  return edges + visibleCount;
}

function right(forest, [row, col], [nextRow, nextCol]) {
  if (forest[nextRow] == undefined || forest[nextRow][nextCol] == undefined)
    return true;
  if (forest[row][col] <= forest[nextRow][nextCol]) return false;

  return right(forest, [row, col], [nextRow, nextCol + 1]);
}

function left(forest, [row, col], [nextRow, nextCol]) {
  if (forest[nextRow] == undefined || forest[nextRow][nextCol] == undefined)
    return true;
  if (forest[row][col] <= forest[nextRow][nextCol]) return false;

  return left(forest, [row, col], [nextRow, nextCol - 1]);
}

function top(forest, [row, col], [nextRow, nextCol]) {
  if (forest[nextRow] == undefined || forest[nextRow][nextCol] == undefined)
    return true;
  if (forest[row][col] <= forest[nextRow][nextCol]) return false;

  return top(forest, [row, col], [nextRow - 1, nextCol]);
}

function bottom(forest, [row, col], [nextRow, nextCol]) {
  if (forest[nextRow] == undefined || forest[nextRow][nextCol] == undefined)
    return true;
  if (forest[row][col] <= forest[nextRow][nextCol]) return false;

  return bottom(forest, [row, col], [nextRow + 1, nextCol]);
}

console.log(puzzle1());
