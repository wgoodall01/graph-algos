import {
  mapWhere,
  withId,
  adjacentTo,
  getById,
  getAdjacent
} from "./graphUtils";

describe("mapWhere", () => {
  it("is a noop when called with empty array", () => {
    expect(mapWhere([], e => true, e => false)).toEqual([]);
  });

  it("modifies items correctly", () => {
    const arr = [1, 2, 3, 4];
    const out = [1, 1, 3, 2];
    expect(mapWhere(arr, e => e % 2 == 0, e => e / 2)).toEqual(out);
  });
});

describe("getById", () => {
  it("should not explode with empty array", () => {
    expect(getById([], 100)).toBeUndefined();
  });

  it("returns undefined when the item is not present", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
    expect(getById(input, 10)).toBeUndefined();
  });

  it("should return a single element", () => {
    const input = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
    expect(getById(input, 3)).toBe(input[2]);
  });
});

describe("getAdjacent", () => {
  it("should not explode with empty array", () => {
    expect(getAdjacent([], 100)).toEqual([]);
  });

  it("should return multiple elements", () => {
    const input = [
      { to: 1, from: 123 },
      { from: 1, to: 321 },
      { to: 4, from: 5 },
      { from: 3, to: 9 }
    ];
    const out = [{ to: 1, from: 123 }, { from: 1, to: 321 }];
    expect(getAdjacent(input, 1)).toEqual(out);
  });
});
