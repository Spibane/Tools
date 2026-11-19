// Run with: node --test tasks/
const test = require("node:test"), assert = require("node:assert"), fs = require("node:fs"), vm = require("node:vm");

// time.js is a plain browser script, so it runs in a context of its own and its functions are read back out
const ctx = vm.createContext({});
vm.runInContext(fs.readFileSync(__dirname + "/time.js", "utf8"), ctx);
const { resetWindow, endOf } = vm.runInContext("({resetWindow, endOf})", ctx);
const iso = t => new Date(t).toISOString();
const NY = "America/New_York";

test("a daily reset keeps its local time across the clocks going forward", () => {
  const w = resetWindow({ every: "day", time: "01:30", tz: NY }, Date.UTC(2026, 2, 8, 16));
  assert.equal(iso(w.last), "2026-03-08T06:30:00.000Z"); // 01:30 EST
  assert.equal(iso(w.next), "2026-03-09T05:30:00.000Z"); // 01:30 EDT
});

test("on the night the clocks go back, a reset in the repeated hour happens once, the first time", () => {
  const w = resetWindow({ every: "day", time: "01:30", tz: NY }, Date.UTC(2026, 10, 1, 17));
  assert.equal(iso(w.last), "2026-11-01T05:30:00.000Z");
  assert.equal(iso(w.next), "2026-11-02T06:30:00.000Z");
});

test("a monthly reset on the 31st happens on the last day of a shorter month", () => {
  const w = resetWindow({ every: "month", day: 31, time: "00:00", tz: NY }, Date.UTC(2026, 3, 15));
  assert.equal(iso(w.next), "2026-04-30T04:00:00.000Z");
});

test("a weekly reset goes back to the last of its weekday", () => {
  const w = resetWindow({ every: "week", weekday: 2, time: "15:00", tz: "UTC" }, Date.UTC(2026, 10, 18, 16));
  assert.equal(iso(w.last), "2026-11-17T15:00:00.000Z");
  assert.equal(iso(w.next), "2026-11-24T15:00:00.000Z");
});

test("a zone this browser doesn't know counts as UTC instead of throwing", () => {
  const w = resetWindow({ every: "day", time: "00:00", tz: "Mars/Olympus" }, Date.UTC(2026, 10, 18, 12));
  assert.equal(iso(w.last), "2026-11-18T00:00:00.000Z");
  assert.equal(endOf({ end: "2026-11-18", endTime: "", tz: "Mars/Olympus" }), Date.UTC(2026, 10, 19));
});
