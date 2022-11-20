const assert = require("assert");
const { depthFirst, breadthFirst, buildGraph } = require("./graph");
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
breadthFirst(aCycle, "a", (value) => {
  console.log(value);
  return value === "e";
}); // a,b,c,d,e

const edges = [
  ["i", "j"],
  ["k", "i"],
  ["m", "k"],
  ["k", "l"],
  ["o", "n"],
];
// console.log(buildGraph(edges));

const undirectedPath = (edges, nodeA, nodeB) => {
  const graph = buildGraph(edges);
  return hasPath(graph, nodeA, nodeB);
};

const hasPath = (graph, src, dst) => {
  if (
    depthFirst(graph, src, (value) => {
      return value === dst;
    }) === true
  ) {
    return true;
  }
  return false;
};

console.log("test: j->m true");
assert(undirectedPath(edges, "j", "m") === true, "j->m should be true"); // -> true
console.log("test: k->o false");
assert(undirectedPath(edges, "k", "o") === false, "k->o should be false"); // -> false
