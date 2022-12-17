const { readPuzzle } = require("../file-reader");

class Monkey {
  constructor() {
    this.items = [];
    this.operation = "+";
    this.divisibleValue = 1;
    this.moveTo = new Map();
    this.inspected = 0;
  }
  divisible(val) {
    return val % this.divisibleValue === 0;
  }
  newValue(itemVal) {
    const op = this.operation[0];
    const val =
      this.operation[1] === "old" ? itemVal : Number(this.operation[1]);
    if (op == "+") return itemVal + val;
    if (op == "*") return itemVal * val;
    throw new Error("No value op");
  }
}

function puzzle1() {
  const troop = readPuzzle("2022", "day11.txt", (data) => {
    const monkeyLines = data.split(/\n/g);
    const troop = [];
    for (const line of monkeyLines) {
      if (line.includes("Monkey")) {
        troop.push(new Monkey());
      }
      const monkey = troop[troop.length - 1];
      if (line.includes("Starting")) {
        monkey.items = line.match(/(\d+)/g).map((str) => Number(str));
      }
      if (line.includes("Operation")) {
        const ops = line.split("= ")[1].split(" ");
        monkey.operation = [ops[1], ops[2]];
      }

      if (line.includes("Test")) {
        monkey.divisibleValue = Number(line.match(/(\d+)/g)[0]);
      }
      if (line.includes("true:")) {
        monkey.moveTo.set(true, Number(line.match(/(\d+)/g)[0]));
      }
      if (line.includes("false:")) {
        monkey.moveTo.set(false, Number(line.match(/(\d+)/g)[0]));
      }
    }
    return troop;
  });

  let rounds = 20;
  while (rounds > 0) {
    rounds -= 1;
    for (let i = 0; i < troop.length; i++) {
      const monkey = troop[i];
      while (monkey.items.length) {
        monkey.inspected += 1;
        const item = monkey.items.shift();
        const newVal = monkey.newValue(item);
        const bored = Math.floor(newVal / 3);
        const divisible = monkey.divisible(bored);
        troop[monkey.moveTo.get(divisible)].items.push(bored);
      }
    }
  }
  const desc = troop.map((monkey) => monkey.inspected).sort((a, b) => b - a);
  return desc[0] * desc[1];
}

console.log(puzzle1());
