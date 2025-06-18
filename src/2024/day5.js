const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const [rules, books] = readPuzzle("2024", "day5.txt", (data) => {
    const [rules, books] = data.split("\n\n");
    return [
      rules.split("\n"),
      books.split("\n").map((pages) => pages.split(",").map(Number)),
    ];
  });

  let total = 0;

  for (let j = 0; j < books.length; j++) {
    const book = books[j];

    let validOrder = true;
    for (let i = 0; i < book.length - 1; i++) {
      const page = book[i];
      const rest = book.slice(i + 1);
      if (!rest.every((next) => rules.includes(page + "|" + next))) {
        validOrder = false;
        break;
      }
    }
    if (validOrder) {
      total += book[Math.floor(book.length / 2)];
    }
  }

  return total;
}

console.log(puzzle1());

function validOrder(book, rules) {
  for (let i = 0; i < book.length - 1; i++) {
    const page = book[i];
    const rest = book.slice(i + 1);
    if (!rest.every((next) => rules.includes(page + "|" + next))) {
      return false;
    }
  }
  return true;
}

function puzzle2() {
  const [rules, books] = readPuzzle("2024", "day5.txt", (data) => {
    const [rules, books] = data.split("\n\n");
    return [
      rules.split("\n"),
      books.split("\n").map((pages) => pages.split(",").map(Number)),
    ];
  });

  let total = 0;
  const listInvalid = [];

  for (let j = 0; j < books.length; j++) {
    const book = books[j];

    let valid = validOrder(book, rules);
    if (!valid) listInvalid.push(book);
  }

  for (let j = 0; j < listInvalid.length; j++) {
    const book = listInvalid[j];
    let valid = true;

    for (let i = 0; i < book.length - 1; i++) {
      const page = book[i];
      const rest = book.slice(i + 1);
      for (let k = 0; k < rest.length; k++) {
        const next = rest[k];
        if (!rules.includes(page + "|" + next)) {
          [book[i], book[i + (k + 1)]] = [book[i + (k + 1)], book[i]];
          valid = false;
        }
      }
      if (!valid) {
        j -= 1;
        break;
      }
    }

    if (valid) {
      total += book[Math.floor(book.length / 2)];
    }
  }

  return total;
}

console.log(puzzle2());
