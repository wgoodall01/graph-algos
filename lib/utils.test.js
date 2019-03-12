import { end } from "./utils";

function* testIter(arr, ret) {
  for (let x of arr) {
    yield x;
  }
  if (ret) {
    return ret;
  }
}

it("should return the return value of an iterator", () => {
  const iter = testIter([1, 2, 3, 4, 5], "return");
  expect(end(iter)).toEqual("return");
});

it("should return the return value of an empty iterator", () => {
  const iter = testIter([], "return");
  expect(end(iter)).toEqual("return");
});
