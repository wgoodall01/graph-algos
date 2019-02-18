import Queue from "./Queue";

it("should initialize with a list of items", () => {
  const q = new Queue([1, 2, 3]);
  expect(q.deque()).toBe(1);
  expect(q.deque()).toBe(2);
  expect(q.deque()).toBe(3);
});

it("should give items back in the right order", () => {
  const q = new Queue();
  q.enque(1);
  q.enque(2);
  q.enque(3);
  expect(q.deque()).toBe(1);
  expect(q.deque()).toBe(2);
  expect(q.deque()).toBe(3);
});

it("should have a working .front", () => {
  const q = new Queue([1, 2, 3]);
  expect(q.front).toBe(1);
  q.enque(4);
  q.deque();
  expect(q.front).toBe(2);
});

it("should have a working .back", () => {
  const q = new Queue([1, 2, 3]);
  expect(q.back).toBe(3);
  q.enque(4);
  q.deque();
  expect(q.back).toBe(4);
});

it("should have a working .length", () => {
  const q = new Queue([1, 2, 3, 4, 5]);
  expect(q.length).toBe(5);
});
