// function add1(x: number): number {
//     return x + 1;
// }
//
// function add(x: number, y: number): number {
//     return x + y;
// }

const add1 = (x: number) => x + 1;
const add = (x: number, y: number) => x + y;

const areEqual = <T>(x: T) => (y: T) => x === y;