const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const list = readPuzzle("2021", "day8.txt", (data) =>
    data.split(/\n/g).map((data) => data.split(/\s\|\s/g))
  );

  const unique = new Map();
  unique.set(2, 0); //1
  unique.set(3, 0); //7
  unique.set(4, 0); //4
  unique.set(7, 0); //8
  for (const [_, output] of list) {
    const eachNumber = output.split(" ");
    for (const num of eachNumber) {
      const numLength = num.length;
      if (unique.has(numLength))
        unique.set(numLength, unique.get(numLength) + 1);
    }
  }
  return Array.from(unique.values()).reduce((acc, cur) => acc + cur, 0);
}

console.log(puzzle1());

function puzzle2() {
  const list = readPuzzle("2021", "day8.txt", (data) =>
    data.split(/\n/g).map((data) => data.split(/\s\|\s/g))
  );

  const entries = [];

  for (const [wires, output] of list) {
    const numberList = determineNumbers(wires).map((num) => sortString(num));
    const digits = output.split(" ");
    const fourDials = [];
    for (const digit of digits) {
      fourDials.push(numberList.indexOf(sortString(digit)));
    }
    entries.push(Number(fourDials.join("")));
  }

  return entries.reduce((acc, cur) => acc + cur, 0);
}

function determineNumbers(wires) {
  let wireArr = wires.split(" ");
  const one = wireArr.find((val) => val.length === 2);
  const four = wireArr.find((val) => val.length === 4);
  const seven = wireArr.find((val) => val.length === 3);
  const eight = wireArr.find((val) => val.length === 7);

  const group5 = wireArr.filter((val) => val.length === 5); // 2, 3, 5
  const group6 = wireArr.filter((val) => val.length === 6); // 0, 6, 9

  const three = group5.find(
    (val) => val.includes(one[0]) && val.includes(one[1])
  );
  const nine = group6.find((val) =>
    three.split("").every((letter) => val.includes(letter))
  );

  const zero = group6.find(
    (val) =>
      seven.split("").every((letter) => val.includes(letter)) && val !== nine
  );

  const six = group6.find((val) => val !== nine && val !== zero);

  const five = group5.find(
    (val) => six.split("").filter((letter) => val.includes(letter)).length === 5
  );
  const two = group5.find((val) => val !== five && val !== three);

  return [zero, one, two, three, four, five, six, seven, eight, nine];
}

function sortString(input) {
  return input.split("").sort().join("");
}

console.log(puzzle2());
