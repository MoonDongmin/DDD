const evalWith5ThenAdd2 = (fn: (id: number) => number) => fn(5) + 2;

const add1 = (x: number) => x + 1;
evalWith5ThenAdd2(add1);

const square = (x: number) => x * x;
evalWith5ThenAdd2(square);