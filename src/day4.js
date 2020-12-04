const { fileReader } = require("./file-reader");
const { EOL } = require("os");
const validPassportKeys = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
  // "cid",
];
function puzzle1() {
  const data = fileReader("day4t.txt");
  const list = data.split(`${EOL}${EOL}`);
  let count = 0;
  for (const passport of list) {
    if (validPassportKeys.every((key) => passport.includes(key))) {
      count++;
    }
  }
  return count;
}

// Part 2 validation rules
// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.

const validate = {
  byr: function (text) {
    const year = Number(text);
    return year >= 1920 && year <= 2002;
  },
  iyr: function (text) {
    const year = Number(text);
    return year >= 2010 && year <= 2020;
  },
  eyr: function (text) {
    const year = Number(text);
    return year >= 2020 && year <= 2030;
  },
  hgt: function (text) {
    if (!text.match(/cm|in/)) return false;
    const cm = Number(text.split("cm")[0]);
    const inch = Number(text.split("in")[0]);
    if (cm >= 150 && cm <= 193) return true;
    if (inch >= 59 && inch <= 76) return true;
    return false;
  },
  hcl: function (text) {
    return /^#[a-f0-9]{6}$/.test(text);
  },
  ecl: function (text) {
    return "amb blu brn gry grn hzl oth".includes(text);
  },
  pid: function (text) {
    return /^[0-9]{9}$/.test(text);
  },
};

function puzzle2() {
  const data = fileReader("day4.txt");
  const list = data.split(`${EOL}${EOL}`);
  let count = 0;
  for (const passport of list) {
    if (
      validPassportKeys.every((key) => {
        if (!passport.includes(key)) return false;
        return validate[key](
          passport.match(new RegExp(`${key}:(#*[a-z0-9]+)`, "mi"))[1]
        );
      })
    ) {
      count++;
    }
  }
  return count;
}

console.log(puzzle1());
console.log(puzzle2());
