const { fileReader } = require("./file-reader");

function puzzle1() {
  const data = fileReader("day6.txt");
  const groups = data.split("\n\n");
  let total = 0;
  for (const group of groups) {
    const people = group.split("\n");
    let allAnswers = [];
    for (const person of people) {
      allAnswers = allAnswers.concat(person.split(""));
    }

    total += new Set(allAnswers).size;
  }
  return total;
}

function puzzle2() {
  const data = fileReader("day6.txt");
  const groups = data.split("\n\n");
  let total = 0;
  for (const group of groups) {
    const people = group.split("\n");
    let firstAnswers = people[0].split("");
    if (people.length === 1) {
      total += firstAnswers.length;
      continue;
    }

    for (const answer of firstAnswers) {
      if (people.every((answers) => answers.includes(answer))) {
        total += 1;
      }
    }
  }
  return total;
}

console.log(puzzle1());
console.log(puzzle2());
