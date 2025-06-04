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
