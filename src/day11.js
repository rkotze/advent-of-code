const { fileReader } = require("./file-reader");

function puzzle1() {
  const data = fileReader("day11.txt");
  const seatPlan = data.split("\n");

  const newPlan = seatPlanner(seatPlan);
  return newPlan.reduce((acc, cur) => {
    const cols = cur.split("").filter((val) => val === "#");
    return acc + cols.length;
  }, 0);
}

function seatPlanner(seatPlan) {
  let changed = 0;
  let newSeatPlan = [];
  for (let i = 0; i < seatPlan.length; i++) {
    const row = seatPlan[i];
    const col = row.split("");
    for (let j = 0; j < col.length; j++) {
      const seat = col[j];
      if (
        seat === "L" &&
        isOccupiedAdjacent({ rowPos: i, colPos: j }, seatPlan) === 0
      ) {
        col[j] = "#";
        changed++;
        continue;
      }
      if (
        col[j] === "#" &&
        isOccupiedAdjacent({ rowPos: i, colPos: j }, seatPlan) >= 4
      ) {
        col[j] = "L";
        changed++;
      }
    }
    newSeatPlan.push(col.join(""));
  }
  if (changed === 0) return newSeatPlan;
  return seatPlanner(newSeatPlan);
}

function isOccupiedAdjacent({ rowPos, colPos }, seatPlan) {
  const occupied = "#";
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

console.log(puzzle1());
