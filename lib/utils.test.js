import { end, gather } from "./utils";

function* testIter(arr, ret) {
  for (let x of arr) {
    yield x;
  }
  if (ret) {
    return ret;
  }
}

describe("end", () => {
  it("should return the return value of an iterator", () => {
    const iter = testIter([1, 2, 3, 4, 5], "return");
    expect(end(iter)).toEqual("return");
  });

  it("should return the return value of an empty iterator", () => {
    const iter = testIter([], "return");
    expect(end(iter)).toEqual("return");
  });
});

describe("gather", () => {
  it("should return all values of an iterator", () => {
    const testVals = ["a", "b", "c", "d"];
    const { values } = gather(testIter(testVals, "final"));
    expect(values).toEqual(testVals);
  });

  it("should return the return value of an iterator", () => {
    const testVals = ["a", "b", "c", "d"];
    const { final } = gather(testIter(testVals, "final"));
    expect(final).toEqual("final");
  });
});
