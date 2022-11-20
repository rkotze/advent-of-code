// const assert = require("assert");
const { depthFirst, breathFirst } = require("./graph");
// Adjacent object
// acycle
const aCycle = {
  a: ["b", "c"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
};

console.log("Depth");
depthFirst(aCycle, "a", (value) => {
  console.log(value);
  return value === "b";
}); // a,c,e,b

console.log("Breath");
breathFirst(aCycle, "a", (value) => {
  console.log(value);
  return value === "e";
}); // a,b,c,d,e
