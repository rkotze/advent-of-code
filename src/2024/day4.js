const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const grid = readPuzzle("2024", "day4.txt", (grid) => {
    return grid.split("\n").map((line) => line.split(""));
  });

  return wordCount(grid, "XMAS");
}

function wordCount(grid, word) {
  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    { dr: 0, dc: 1 }, // right
    { dr: 1, dc: 0 }, // down
    { dr: 1, dc: 1 }, // down-right diagonal
    { dr: 0, dc: -1 }, // left
    { dr: -1, dc: 0 }, // up
    { dr: -1, dc: -1 }, // up-left diagonal
    { dr: -1, dc: 1 }, // up-right diagonal
    { dr: 1, dc: -1 }, // down-left diagonal
  ];

  function foundWord(r, c, dr, dc) {
    for (let i = 1; i < word.length; i++) {
      const cr = r + dr * i;
      const cc = c + dc * i;
      const letter = word[i];
      if (
        cr < 0 ||
        cr >= rows ||
        cc < 0 ||
        cc >= cols ||
        letter !== grid[cr][cc]
      ) {
        return false;
      }
    }
    return true;
  }

  let wordCount = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === word[0]) {
        for (const { dr, dc } of directions) {
          if (foundWord(r, c, dr, dc)) {
            wordCount += 1;
          }
        }
      }
    }
  }
  return wordCount;
}
console.log(puzzle1());

function puzzle2() {
  const grid = readPuzzle("2024", "day4.txt", (grid) => {
    return grid
      .trim()
      .split("\n")
      .map((line) => line.trim().split(""));
  });

  return xWordCount(grid, "MAS");
}

function xWordCount(grid, word) {
  const rows = grid.length;
  const cols = grid[0].length;
  const middle = word[1];

  let wordCount = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== middle) continue;
      if (r - 1 >= 0 && c + 1 < cols && r + 1 < rows && c - 1 >= 0) {
        const diag1Forward =
          grid[r - 1][c - 1] === word[0] && grid[r + 1][c + 1] === word[2];

        const diag1Reverse =
          grid[r - 1][c - 1] === word[2] && grid[r + 1][c + 1] === word[0];

        const diag2Forward =
          grid[r - 1][c + 1] === word[0] && grid[r + 1][c - 1] === word[2];

        const diag2Reverse =
          grid[r - 1][c + 1] === word[2] && grid[r + 1][c - 1] === word[0];

        if ((diag1Forward || diag1Reverse) && (diag2Forward || diag2Reverse)) {
          wordCount++;
        }
      }
    }
  }
  return wordCount;
}

console.log(puzzle2());
