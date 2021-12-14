const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const { numbers, boards } = buildGame();
  buildCheckboards(boards);
  // let count = 0;
  // let previousNum = 0;
  // for (const num of list) {
  //   let depth = Number(num);
  //   if (previousNum !== 0 && depth > previousNum) {
  //     count++;
  //   }
  //   previousNum = depth;
  // }
  // return count;
}

console.log(puzzle1());

function buildGame() {
  const list = readPuzzle("2021", "day4-1t.txt", (data) => {
    return data.split(/\n\n/g);
  });

  return {
    numbers: list.shift().split(","),
    boards: list.map((data) => {
      const rows = data.trim().split(/\n/g);
      return rows.map((row) => row.trim().split(/\s+/g));
    }),
  };
}

function buildCheckboards(boards) {
  const checkBoards = [];
  for (let i = 0; i < boards.length; i++) {
    const board = boards[i];
    const rows = [];
    const columns = [];
    for (let j = 0; j < board.length; j++) {
      const row = board[j];
      rows.push(row);
      let column = [];
      for (let k = 0; k < board.length; k++) {
        column.push(board[k][j]);
      }
      columns.push(column);
    }

    checkBoards.push({
      rows,
      columns,
    });
  }
}
