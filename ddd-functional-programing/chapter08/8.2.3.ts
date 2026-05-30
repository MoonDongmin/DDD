// const add1 = (x: number) => x + 1;
// const add2 = (x: number) => x + 2;
// const add3 = (x: number) => x + 3;

const adderGenerator = (numberToAdd: number) => (x: number) => numberToAdd + x;

const add1 = adderGenerator(1);
add1(2);

const add100 = adderGenerator(100);
add100(2);