// const add1 = (x: number) => x + 1;
const add = (n: number) => (x: number) => x + n;

// const add3 = (x: number) => x + 3;
const add3 = add(3);