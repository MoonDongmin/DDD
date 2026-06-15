declare const productCode: unique symbol;

class ProductCode {
  [productCode]!: never;
  constructor(
    readonly value: string
  ) { }
}
