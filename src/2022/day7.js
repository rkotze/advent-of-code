const { readPuzzle } = require("../file-reader");

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
      const strOldPath = path.join("/");
      path.pop();
      const strCurPath = path.join("/");
      dirMap.set(strCurPath, dirMap.get(strOldPath) + dirMap.get(strCurPath));
    }

    const file = line.match(/^(\d+)/g);
    if (file && file.length > 0) {
      const strPath = path.join("/");
      dirMap.set(strPath, dirMap.get(strPath) + Number(file[0]));
    }
  }

  while (path.length > 1) {
    const strOldPath = path.join("/");
    path.pop();
    const strCurPath = path.join("/");

    dirMap.set(strCurPath, dirMap.get(strOldPath) + dirMap.get(strCurPath));
  }
  let total = 0;
  for (const size of dirMap.values()) {
    if (size <= 100000) total += size;
  }

  return total;
}

console.log(puzzle1());

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
      const strOldPath = path.join("/");
      path.pop();
      const strCurPath = path.join("/");
      dirMap.set(strCurPath, dirMap.get(strOldPath) + dirMap.get(strCurPath));
    }

    const file = line.match(/^(\d+)/g);
    if (file && file.length > 0) {
      const strPath = path.join("/");
      dirMap.set(strPath, dirMap.get(strPath) + Number(file[0]));
    }
  }

  while (path.length > 1) {
    const strOldPath = path.join("/");
    path.pop();
    const strCurPath = path.join("/");

    dirMap.set(strCurPath, dirMap.get(strOldPath) + dirMap.get(strCurPath));
  }

  const sysSize = 70000000;
  const minRequired = 30000000;
  const curFree = sysSize - dirMap.get("/");
  const remaining = minRequired - curFree;
  const options = Array.from(dirMap.values()).filter((val) => val > remaining);

  return Math.min(...options);
}

console.log(puzzle2());
