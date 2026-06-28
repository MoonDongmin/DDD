declare const customerId: unique symbol;

class CustomerId {
  [customerId]!: never;
  constructor(readonly value: number) { }
  ...
}

declare const birthdate: unique symbol;
class Birthdate {
  [birthdate]!: never;
  constructor(readonly value: Date) { }
  ...
}

class Customer {
  constructor(
    readonly customerId: CustomerId,
    readonly name: String50,
    readonly birthdate: O.Option<Birthdate>,
  ) {

  }
  ...
}