import Path from "./Path";

it("should have length=1 when single", () => {
  const p = new Path(0);
  expect(p.length).toBe(1);
});

it("should have length=2 with one previous", () => {
  const p0 = new Path("a");
  const p1 = new Path("b", p0);
  expect(p1.length).toBe(2);
});

it("should have working append()", () => {
  const p0 = new Path("a");
  const p1 = p0.append("b");
  expect(p1.prev).toBe(p0);
});

it("should have working items()", () => {
  const p0 = new Path("a");
  const p1 = p0.append("b");
  const p2 = new Path("c", p1);

  expect(p2.items()).toEqual(["a", "b", "c"]);
});

it("should have working has()", () => {
  let path = new Path(0);
  path = path.append(1);
  path = path.append(2);
  path = path.append(3);
  path = path.append(4);

  expect(path.has([])).toBe(true);
  expect(path.has([0])).toBe(true);
  expect(path.has([1])).toBe(true);
  expect(path.has([4])).toBe(true);
  expect(path.has([3])).toBe(true);
  expect(path.has([2, 3])).toBe(true);
  expect(path.has([1, 3])).toBe(false);
  expect(path.has([1, 3])).toBe(false);
  expect(path.has([3, 2])).toBe(false);
  expect(path.has([4, 5])).toBe(false);
  expect(path.has([3, 5])).toBe(false);
});
