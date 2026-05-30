import { match } from "fp-ts/lib/EitherT";

const twelveDividedBy = (n: number) =>
  match(n)
    .with(6, _ => 2)
    ...  
    .with (0, _ => { throw "Can't divided by zero." })
    .otherwise(...);