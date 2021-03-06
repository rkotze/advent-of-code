const { fileReader } = require("./file-reader");
// BFFFBBFRRR: row 70, column 7, seat ID 567.
// FFFBBBFRRR: row 14, column 7, seat ID 119.
// BBFFBBFRLL: row 102, column 4, seat ID 820.
function puzzle1() {
  const data = fileReader("day5.txt");
  const list = data.split("\n");
  let seatIds = getAllSeatIds(list);
  return Math.max(...seatIds);
}

function puzzle2() {
  const data = fileReader("day5.txt");
  const list = data.split("\n");
  let seatIds = getAllSeatIds(list);
  seatIds.sort((a, b) => a - b);
  for (let i = 0; i < seatIds.length; i++) {
    const seatA = seatIds[i];
    const seatB = seatIds[i + 1];
    if (seatB - seatA === 2) return seatA + 1;
  }
  return 0;
}

function getAllSeatIds(list) {
  let seatIds = [];
  for (const boardingPass of list) {
    const parts = boardingPass.split("");
    let rowRange = [...Array(128).keys()];
    let columnRange = [...Array(8).keys()];
    for (const pos of parts) {
      if (pos === "F") rowRange = lowerRange(rowRange);
      if (pos === "B") rowRange = upperRange(rowRange);
      if (pos === "L") columnRange = lowerRange(columnRange);
      if (pos === "R") columnRange = upperRange(columnRange);
    }

    seatIds.push(Number(rowRange[0]) * 8 + Number(columnRange[0]));
  }
  return seatIds;
}

function upperRange(rowRange) {
  return rowRange.slice(Math.ceil(rowRange.length / 2));
}

function lowerRange(rowRange) {
  return rowRange.slice(0, Math.floor(rowRange.length / 2));
}

console.log(puzzle1());
console.log(puzzle2());
