const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const data = readPuzzle("2022", "day10.txt");
  let x = 1;
  let cycles = 1;
  let checkpoint = 20;
  let signalsChecks = [];
  let partCycle = 0;
  for (let i = 0; i < data.length; i++) {
    const instruct = data[i];
    // console.log("cycles:", cycles);
    if (cycles === checkpoint) {
      signalsChecks.push(checkpoint * x);
      checkpoint += 40;
    }
    if (instruct === "noop") {
      cycles += 1;
      continue;
    }
    cycles += 1;
    if (partCycle == 0) {
      i -= 1;
      partCycle = 1;
    } else {
      partCycle = 0;
      const val = instruct.match(/(-?\d+)/g);
      x += Number(val[0]);
    }
  }
  // console.log(signalsChecks);
  return signalsChecks.reduce((total, next) => (total += next), 0);
}

console.log(puzzle1());
