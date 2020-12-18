const { fileReader } = require("./file-reader");

const occupied = "#";
const empty = "L";
const noSeat = ".";

function puzzle1() {
  const data = fileReader("day11.txt");
  const seatPlan = data.split("\n");

  const newPlan = seatPlanner(seatPlan, isOccupiedAdjacent, 4);
  return newPlan.reduce((acc, cur) => {
    const cols = cur.split("").filter((val) => val === "#");
    return acc + cols.length;
  }, 0);
}

function seatPlanner(seatPlan, isOccupied, maxSeatSwitch) {
  let changed = 0;
  let newSeatPlan = [];
  for (let i = 0; i < seatPlan.length; i++) {
    const row = seatPlan[i];
    const col = row.split("");
    for (let j = 0; j < col.length; j++) {
      const seat = col[j];
      if (
        seat === empty &&
        isOccupied({ rowPos: i, colPos: j }, seatPlan) === 0
      ) {
        col[j] = occupied;
        changed++;
        continue;
      }
      if (
        col[j] === occupied &&
        isOccupied({ rowPos: i, colPos: j }, seatPlan) >= maxSeatSwitch
      ) {
        col[j] = "L";
        changed++;
      }
    }
    newSeatPlan.push(col.join(""));
  }
  if (changed === 0) return newSeatPlan;
  return seatPlanner(newSeatPlan, isOccupied, maxSeatSwitch);
}

function isOccupiedAdjacent({ rowPos, colPos }, seatPlan) {
  const left = seatPlan[rowPos].charAt(colPos - 1);
  const right = seatPlan[rowPos].charAt(colPos + 1);
  const top = seatPlan[rowPos - 1] ? seatPlan[rowPos - 1].charAt(colPos) : null;
  const bottom = seatPlan[rowPos + 1]
    ? seatPlan[rowPos + 1].charAt(colPos)
    : null;
  const dTopLeft = seatPlan[rowPos - 1]
    ? seatPlan[rowPos - 1].charAt(colPos - 1)
    : null;
  const dTopRight = seatPlan[rowPos - 1]
    ? seatPlan[rowPos - 1].charAt(colPos + 1)
    : null;
  const dBottomLeft = seatPlan[rowPos + 1]
    ? seatPlan[rowPos + 1].charAt(colPos - 1)
    : null;
  const dBottomRight = seatPlan[rowPos + 1]
    ? seatPlan[rowPos + 1].charAt(colPos + 1)
    : null;

  const log = [
    left,
    top,
    right,
    bottom,
    dBottomLeft,
    dBottomRight,
    dTopLeft,
    dTopRight,
  ];
  let count = 0;
  for (const check of log) {
    if (check === occupied) count++;
  }

  return count;
}

function lineOfSight({ rowPos, colPos }, { rowDir, colDir }, seatPlan) {
  const nextRowPos = rowPos + rowDir;
  const nextColPos = colPos + colDir;
  const seat = seatPlan[nextRowPos]
    ? seatPlan[nextRowPos].charAt(nextColPos)
    : "";
  if (seat === "") return null;
  if (seat === noSeat)
    return lineOfSight(
      { rowPos: nextRowPos, colPos: nextColPos },
      { rowDir, colDir },
      seatPlan
    );
  return seat;
}

function isOccupiedInSight({ rowPos, colPos }, seatPlan) {
  const left = lineOfSight(
    { rowPos, colPos },
    { rowDir: 0, colDir: -1 },
    seatPlan
  );
  const right = lineOfSight(
    { rowPos, colPos },
    { rowDir: 0, colDir: +1 },
    seatPlan
  );
  const top = lineOfSight(
    { rowPos, colPos },
    { rowDir: -1, colDir: 0 },
    seatPlan
  );
  const bottom = lineOfSight(
    { rowPos, colPos },
    { rowDir: +1, colDir: 0 },
    seatPlan
  );
  const dTopLeft = lineOfSight(
    { rowPos, colPos },
    { rowDir: -1, colDir: -1 },
    seatPlan
  );
  const dTopRight = lineOfSight(
    { rowPos, colPos },
    { rowDir: -1, colDir: +1 },
    seatPlan
  );
  const dBottomLeft = lineOfSight(
    { rowPos, colPos },
    { rowDir: +1, colDir: -1 },
    seatPlan
  );
  const dBottomRight = lineOfSight(
    { rowPos, colPos },
    { rowDir: +1, colDir: +1 },
    seatPlan
  );

  const log = [
    left,
    top,
    right,
    bottom,
    dBottomLeft,
    dBottomRight,
    dTopLeft,
    dTopRight,
  ];
  let count = 0;
  for (const check of log) {
    if (check === occupied) count++;
  }

  return count;
}

function puzzle2() {
  const data = fileReader("day11.txt");
  const seatPlan = data.split("\n");

  const newPlan = seatPlanner(seatPlan, isOccupiedInSight, 5);
  return newPlan.reduce((acc, cur) => {
    const cols = cur.split("").filter((val) => val === "#");
    return acc + cols.length;
  }, 0);
}

console.log(puzzle1());
console.log(puzzle2());
