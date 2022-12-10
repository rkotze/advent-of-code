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

  return signalsChecks.reduce((total, next) => (total += next), 0);
}

console.log(puzzle1());

const RED = "\u001B[31m";
const RESET = "\u001B[0m";

function red(text) {
  return RED + text + RESET;
}

function puzzle2() {
  const data = readPuzzle("2022", "day10.txt");
  let x = 1;
  let cycles = 1;
  let CRTrow = 0;
  let CRTcol = 0;
  let checkpoint = 40;
  let CRTrender = [];
  let partCycle = 0;
  for (let i = 0; i < data.length; i++) {
    if (CRTrender[CRTrow] == undefined) CRTrender.push([]);

    const sprintS = x - 1;
    const sprintE = x + 1;
    const inRange = CRTcol >= sprintS && CRTcol <= sprintE;
    if (inRange) {
      CRTrender[CRTrow].push(red("#"));
    } else {
      CRTrender[CRTrow].push(" ");
    }
    CRTcol += 1;

    if (cycles === checkpoint) {
      CRTrow += 1;
      CRTcol = 0;
      checkpoint += 40;
    }

    const instruct = data[i];
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

  return CRTrender.map((pixelRow) => pixelRow.join("")).join("\n");
}

console.log(puzzle2());
