function plus3(x: number): number {
  return x + 3;
}

function time2(x: number): number {
  return x * 2;
}

const square = (x: number) => x * x;
const addThree = plus3;

const listOfFunctions = [addThree, time2, square];

for (const fn of listOfFunctions) {
  const result = fn(100);

  console.log(`If 100 is the input, the output is ${result}`);
}