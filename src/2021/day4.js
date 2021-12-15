const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const { numbers, boards } = buildGame();
  const checkboards = buildCheckboards(boards);
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    for (const board of checkboards) {
      for (let j = 0; j < board.rows.length; j++) {
        const row = board.rows[j];
        const col = board.columns[j];
        const rowIndex = row.indexOf(number);
        const colIndex = col.indexOf(number);
        if (rowIndex > -1) {
          row[rowIndex] = "x";
        }
        if (colIndex > -1) {
          col[colIndex] = "x";
        }
        if (checkForWinner(row) || checkForWinner(col)) {
          return sumBoard(board.rows) * number;
        }
      }
    }
  }
}

console.log(puzzle1());

function checkForWinner(arr) {
  return arr.every((val) => val === "x");
}

function sumBoard(board) {
  return board.reduce((acc, nxt) => {
    acc += nxt.reduce((acc, nxt) => (acc += nxt != "x" ? Number(nxt) : 0), 0);
    return acc;
  }, 0);
}

function buildGame() {
  const list = readPuzzle("2021", "day4.txt", (data) => {
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
  return checkBoards;
}
