// Depth first can be recursive
// follows a direct path
function depthFirst(graph, src, cb) {
  const stack = [src];
  // sets are O(1) time, array look up O(n) time
  const visited = new Set();

  while (stack.length > 0) {
    const current = stack.pop();
    visited.add(current);
    if (cb(current) === true) return true;
    for (const next of graph[current]) {
      if (!visited.has(next)) {
        stack.push(next);
      }
    }
  }
}

// Breath first can NOT be recursive
// Looks at all immediate path for a node
function breadthFirst(graph, src, cb) {
  const queue = [src];
  // sets are O(1) time, array look up O(n) time
  const visited = new Set();

  while (queue.length > 0) {
    const current = queue.shift();
    visited.add(current);
    if (cb(current) === true) return true;
    for (const next of graph[current]) {
      if (!visited.has(next)) {
        queue.push(next);
      }
    }
  }
}

function buildGraph(edges) {
  const graph = {};

  for (let edge of edges) {
    const [a, b] = edge;
    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }

  return graph;
}

module.exports = { depthFirst, breadthFirst, buildGraph };
