const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const list = readPuzzle("2021", "day7.txt", (data) =>
    data.split(",").map((data) => Number(data))
  );

  const fuelTracker = new Map();
  for (let i = 0; i < list.length; i++) {
    const crab = list[i];
    if (fuelTracker.has(crab)) continue;
    let totalFuel = 0;
    for (const num of list) {
      const fuel = Math.abs(num - crab);
      totalFuel += fuel;
    }
    fuelTracker.set(crab, totalFuel);
  }

  return Math.min(...Array.from(fuelTracker.values()));
}

console.log(puzzle1());
