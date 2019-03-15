export const nodes = [
  { id: 1, x: -201, y: -15 },
  { id: 2, x: -127, y: -218 },
  { id: 3, x: -9, y: -165 },
  { id: 4, x: 143, y: -131 },
  { id: 5, x: 256, y: 89 },
  { id: 6, x: 77, y: 88 },
  { id: 7, x: -55, y: 21 }
];

export const edges = [
  { id: -1, from: 1, to: 2, weight: 1 },
  { id: -2, from: 2, to: 3, weight: 3 },
  { id: -3, from: 3, to: 4, weight: 1 },
  { id: -4, from: 4, to: 5, weight: 1 },
  { id: -5, from: 5, to: 6, weight: 1 },
  { id: -6, from: 6, to: 7, weight: 10 },
  { id: -7, from: 7, to: 1, weight: 1 },
  { id: -8, from: 7, to: 3, weight: 1 },
  { id: -9, from: 4, to: 7, weight: 10 }
];

export default { nodes, edges };