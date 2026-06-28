import type { Option } from "fp-ts/lib/Option";

class PromotionCode {
  ...
  constructor(
    readonly value: string
  ) { }
}

class ValidatedOrder {
  ...
  promotionCode: Option<PromotionCode>;
}

class OrderDto {
  ...
  readonly promotionCode: string | null = null;
  ...
}

class unvalidatedOrder {
  ...
  readonly promotionCode: string | null,
  ...
}