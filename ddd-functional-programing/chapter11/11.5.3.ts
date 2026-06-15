import type { Option } from "fp-ts/lib/Option";

declare const orderLineId: unique symbol;

class orderLineId {
  [orderLineId]!: never;
  constructor(
    readonly value: number
  ) { }
}

declare const orderLineQty: unique symbol;
class OrderLineQty {
  [orderLineQty]!: never;
  constructor(
    readonly value: number
  ) { }
}

// 도메인 타입
class OrderLine {
  constructor(
    readonly orderLineId: OrderLIneId,
    readonly productCode: ProductCode,
    readonly quantity: Option<OrderLineQty>,
    readonly description: Option<string>,
  ) { }
}

// 해당하는 DTO 타입
class OrderLineDto {
  constructor(
    readonly orderLineId: number,
    readonly productCode: string,
    readonly quantity: number | null = null,
    readonly description: string | null = null,
  ) { }
}