// Run with: node --test brackets/
const test = require("node:test"), assert = require("node:assert"), fs = require("node:fs"), vm = require("node:vm");

// build.js is a plain browser script, so it runs in a context of its own and its functions are read back out
const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync(__dirname + "/build.js", "utf8"), ctx);
const { elim, solve, robin, BYE } = vm.runInContext("({elim, solve, robin, BYE})", ctx);

// Plays a whole bracket, picking each winner at random, the way the page does: solve, enter a result, solve again.
// Returns the champion and how many times each player lost.
function play(n, double) {
  const { M, W } = elim(n, double), results = {}, losses = Array(n).fill(0);
  for (;;) {
    const res = solve(M, n, results);
    const g0 = double && res("g0"), reset = double && g0.w !== undefined && g0.w === g0.b;
    const ids = Object.keys(M).filter(id => id !== "g1" || reset);
    const next = ids.find(id => { const m = res(id); return m.w === undefined && m.a >= 0 && m.b >= 0; });
    if (!next) {
      const champ = !double ? res(W[W.length - 1][0]).w : reset ? res("g1").w : g0.w;
      ids.forEach(id => { const m = res(id); if (m.l >= 0) losses[m.l]++; });
      return { champ, losses };
    }
    const m = res(next), [w, l] = Math.random() < 0.5 ? [m.a, m.b] : [m.b, m.a];
    results[next] = [w, l];
  }
}

test("single elimination: everyone but the champion loses exactly once", () => {
  for (let n = 2; n <= 17; n++) for (let run = 0; run < 20; run++) {
    const { champ, losses } = play(n, false);
    assert.ok(champ >= 0, `${n} players: no champion`);
    losses.forEach((x, p) => assert.equal(x, p === champ ? 0 : 1, `${n} players: player ${p} lost ${x} times`));
  }
});

test("double elimination: everyone but the champion loses exactly twice, the champion at most once", () => {
  for (let n = 2; n <= 17; n++) for (let run = 0; run < 50; run++) {
    const { champ, losses } = play(n, true);
    assert.ok(champ >= 0, `${n} players: no champion`);
    losses.forEach((x, p) => assert.ok(p === champ ? x <= 1 : x === 2, `${n} players: player ${p} lost ${x} times`));
  }
});

test("byes go to the top seeds", () => {
  const { M } = elim(5, false), res = solve(M, 5, {});
  // With 5 players in an 8 bracket, seeds 1-3 go straight through and only 4 and 5 play in the first round
  const through = Object.keys(M).filter(id => id.startsWith("w0-")).map(res).filter(m => m.l === BYE).map(m => m.w);
  assert.deepEqual([...through].sort(), [0, 1, 2]);
});

test("a result that no longer fits its match is dropped", () => {
  const { M } = elim(4, false), results = { "w0-0": [0, 3], "w0-1": [1, 2], "w1-0": [0, 1] };
  results["w0-0"] = [3, 0]; // the first match changes, so the final it fed can't stand
  solve(M, 4, results);
  assert.equal(results["w1-0"], undefined);
});

test("round robin: everyone plays everyone once", () => {
  for (let n = 2; n <= 12; n++) {
    const seen = new Set();
    robin(n).flat().filter(([a, b]) => a !== BYE && b !== BYE).forEach(([a, b]) => {
      const k = Math.min(a, b) + "-" + Math.max(a, b);
      assert.ok(!seen.has(k), `${n} players: ${k} twice`); seen.add(k);
    });
    assert.equal(seen.size, n * (n - 1) / 2);
  }
});
