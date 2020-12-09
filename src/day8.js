const { fileReader } = require("./file-reader");

function puzzle1() {
  const data = fileReader("day8t.txt");
  const list = data.split("\n");
  let visited = false;
  let position = 0;
  let total = 0;
  while (!visited) {
    const input = list[position];
    if (/^x/.test(input)) {
      visited = true;
    }
    const [, action, value] = input.match(/([a-z]+)\s(.+)/i);

    list[position] = "x" + input;
    if (action === "nop") {
      position++;
    }
    if (action === "acc") {
      total += Number(value);
      position++;
    }
    if (action === "jmp") {
      position += Number(value);
    }
  }
  return total;
}

function puzzle2() {
  const data = fileReader("day8t.txt");
  const list = data.split("\n");
  let testList = list.slice(0);
  let visited = false;
  let position = 0;
  let swapLog = [];
  let total = 0;
  while (!visited) {
    if (position >= testList.length) {
      visited = true;
      break;
    }
    const input = testList[position];
    if (/^x/.test(input)) {
      total = 0;
      position = 0;
      testList = list.slice(0);
      updateSwap(swapLog, "x");
    }
    console.log("🚀 ~ input", input, position);
    const [, action, value] = input.match(/([a-z]+)\s(.+)/i);

    testList[position] = "x" + input;
    if (action === "nop") {
      if (shouldSwap(swapLog, position + action)) {
        swapLog.push(position + action);
        if (Number(value) === 0) {
          position++;
        } else {
          position += Number(value);
        }
      } else {
        position++;
      }
    }
    if (action === "acc") {
      console.log("🚀 ~ file: day8.js ~ line 68 ~ puzzle2 ~ action", action);
      total += Number(value);
      position++;
    }
    if (action === "jmp") {
      if (shouldSwap(swapLog, position + action)) {
        swapLog.push(position + action);
        position++;
      } else {
        position += Number(value);
      }
    }
  }
  return total;
}

function shouldSwap(log, key) {
  const active = log.find((item) => item.includes(key));
  if (!active) {
    return true;
  }
  return !active.includes("x");
}

function updateSwap(log, value) {
  log[log.length - 1] += value;
}

console.log(puzzle1());
console.log(puzzle2());
