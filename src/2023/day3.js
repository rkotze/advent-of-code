const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const rows = readPuzzle("2023", "day3.txt");
  let total = 0;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].split("");
    let numStr = "";
    let symbolFound = false;
    for (let k = 0; k < row.length; k++) {
      const cell = row[k];
      if (isNumber(cell)) {
        numStr += cell;
        if (!symbolFound && symbolScan(rows, i, k)) {
          symbolFound = true;
        }
      }
      if (!isNumber(cell)) {
        if (symbolFound && numStr.length) {
          total += Number(numStr);
        }
        numStr = "";
        symbolFound = false;
      }
    }
  }
  return total;
}

function isSymbol(val) {
  return typeof val !== "undefined" && val !== "." && !isNumber(val);
}

function symbolScan(rows, rowPos, cellPos) {
  if (isSymbol(rows[rowPos][cellPos + 1])) return true;
  if (isSymbol(rows[rowPos][cellPos - 1])) return true;

  if (rows[rowPos + 1]) {
    if (isSymbol(rows[rowPos + 1][cellPos])) return true;
    if (isSymbol(rows[rowPos + 1][cellPos + 1])) return true;
    if (isSymbol(rows[rowPos + 1][cellPos - 1])) return true;
  }

  if (rows[rowPos - 1]) {
    if (isSymbol(rows[rowPos - 1][cellPos])) return true;
    if (isSymbol(rows[rowPos - 1][cellPos - 1])) return true;
    if (isSymbol(rows[rowPos - 1][cellPos + 1])) return true;
  }

  return false;
}

function isNumber(str) {
  return /\d/.test(str);
}

console.log(puzzle1());
