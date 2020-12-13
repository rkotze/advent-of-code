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
  const data = fileReader("day8.txt");
  const list = data.split("\n");
  for (let i = 0; i < list.length; i++) {
    const cmd = list[i];
    let visited = false;
    let position = 0;
    let total = 0;
    let testList = list.slice(0);
    const [, action, value] = cmd.match(/([a-z]+)\s(.+)/i);
    if (action === "nop") {
      testList[i] = "jmp " + value;
    } else if (action === "jmp") {
      testList[i] = "nop " + value;
    }

    while (!visited) {
      if (position >= testList.length) {
        break;
      }
      const input = testList[position];
      if (/^x/.test(input)) {
        visited = true;
        break;
      }
      const [, action, value] = input.match(/([a-z]+)\s(.+)/i);

      testList[position] = "x" + input;
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
    if (!visited) {
      return total;
    }
  }
}

console.log(puzzle1());
console.log(puzzle2());
