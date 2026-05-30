import { flow, pipe } from "fp-ts/lib/function";

const add1 = (x: number) => x + 1;
const square = (x: number) => x * x;
// const add1ThenSquare = (x: number) => pipe(x, add1, square);
const add1ThenSquare = flow(add1, square);
add1ThenSquare(5);

const isEven = (x: number) => (x % 2) === 0;
const printBool = (x: boolean) => `value is ${x}`;
const isEvenThenPrint = flow(isEven, printBool);
isEvenThenPrint(2);