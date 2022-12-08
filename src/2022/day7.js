const assert = require("assert");
const { readPuzzle } = require("../file-reader");

function addSubDirSize(path, dirMap) {
  const strOldPath = path.join("/");
  path.pop();
  const strCurPath = path.join("/");
  dirMap.set(strCurPath, dirMap.get(strOldPath) + dirMap.get(strCurPath));
}

function puzzle1() {
  const data = readPuzzle("2022", "day7.txt");
  const dirMap = new Map();
  let path = [];
  for (const line of data) {
    const out = line.split(" ");
    if (line.includes("$ cd") && !line.includes("..")) {
      path.push(out[2]);
      dirMap.set(path.join("/"), 0);
    }
    if (line.includes("$ cd ..")) {
      addSubDirSize(path, dirMap);
    }

    const file = line.match(/^(\d+)/g);
    if (file && file.length > 0) {
      const strPath = path.join("/");
      dirMap.set(strPath, dirMap.get(strPath) + Number(file[0]));
    }
  }

  // accumulate sub dir sizes
  while (path.length > 1) {
    addSubDirSize(path, dirMap);
  }

  let total = 0;
  for (const size of dirMap.values()) {
    if (size <= 100000) total += size;
  }

  return total;
}

const puzzleAnswer1 = puzzle1();
assert(1908462 === puzzleAnswer1);
console.log(puzzleAnswer1);

function puzzle2() {
  const data = readPuzzle("2022", "day7.txt");
  const dirMap = new Map();
  let path = [];
  for (const line of data) {
    const out = line.split(" ");
    if (line.includes("$ cd") && !line.includes("..")) {
      path.push(out[2]);
      dirMap.set(path.join("/"), 0);
    }
    if (line.includes("$ cd ..")) {
      addSubDirSize(path, dirMap);
    }

    const file = line.match(/^(\d+)/g);
    if (file && file.length > 0) {
      const strPath = path.join("/");
      dirMap.set(strPath, dirMap.get(strPath) + Number(file[0]));
    }
  }

  while (path.length > 1) {
    addSubDirSize(path, dirMap);
  }

  const sysSize = 70000000;
  const minRequired = 30000000;
  const curFree = sysSize - dirMap.get("/");
  const remaining = minRequired - curFree;
  const options = Array.from(dirMap.values()).filter((val) => val > remaining);

  return Math.min(...options);
}

const puzzleAnswer2 = puzzle2();
assert(3979145 === puzzleAnswer2);
console.log(puzzleAnswer2);
