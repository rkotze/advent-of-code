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

function puzzle2() {
  const rows = readPuzzle("2023", "day3.txt");
  const numberCoords = {};
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].split("");
    let numS = "";
    let symbol = "";
    for (let k = 0; k < row.length; k++) {
      const cell = row[k];
      if (isNumber(cell)) {
        numS += cell;
        if (!symbol && gearScan(rows, i, k)) {
          let gear = gearScan(rows, i, k);
          symbol = `${gear.rows}:${gear.cell}`;
          let hasGear = numberCoords[symbol];
          if (!hasGear) numberCoords[symbol] = [];
        }
      }
      if (!isNumber(cell)) {
        if (symbol && numS.length) {
          numberCoords[symbol].push(Number(numS));
        }
        symbol = "";
        numS = "";
      }
    }
  }

  let total = 0;
  let gears = Object.values(numberCoords);
  for (const powers of gears) {
    if (powers.length === 2) {
      total += powers[0] * powers[1];
    }
  }

  return total;
}

function isGear(val) {
  return typeof val !== "undefined" && val === "*";
}

function gearScan(rows, rowPos, cellPos) {
  if (isGear(rows[rowPos][cellPos + 1]))
    return { rows: rowPos, cell: cellPos + 1 };
  if (isGear(rows[rowPos][cellPos - 1]))
    return { rows: rowPos, cell: cellPos - 1 };

  if (rows[rowPos + 1]) {
    if (isGear(rows[rowPos + 1][cellPos]))
      return { rows: rowPos + 1, cell: cellPos };
    if (isGear(rows[rowPos + 1][cellPos + 1]))
      return { rows: rowPos + 1, cell: cellPos + 1 };
    if (isGear(rows[rowPos + 1][cellPos - 1]))
      return { rows: rowPos + 1, cell: cellPos - 1 };
  }

  if (rows[rowPos - 1]) {
    if (isGear(rows[rowPos - 1][cellPos]))
      return { rows: rowPos - 1, cell: cellPos };
    if (isGear(rows[rowPos - 1][cellPos - 1]))
      return { rows: rowPos - 1, cell: cellPos - 1 };
    if (isGear(rows[rowPos - 1][cellPos + 1]))
      return { rows: rowPos - 1, cell: cellPos + 1 };
  }

  return false;
}

console.log(puzzle2());
