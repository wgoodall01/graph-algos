import Path from "./Path";

it("should have length=1 when empty", () => {
  const p = new Path();
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
