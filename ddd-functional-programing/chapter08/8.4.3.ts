import { match, type Option } from "fp-ts/lib/Option";
import { P } from "ts-pattern";

const add1 = (x: number) => x + 1;

const printOption = (x: Option<number>) => match(x)
  .with(P.instanceOf(Some), i => console.log("The int is ", i))
  .with(P.instanceOf(None), _ => console.log("No value"))
  .exhaustive();

pipe(5, add1, some, printOption)