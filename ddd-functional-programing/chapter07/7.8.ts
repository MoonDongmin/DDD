/**
 * 입력 data
 */

import type { TaskEither } from "fp-ts/lib/TaskEither";

class UnvalidatedOrder {
  constructor(
    readonly orderId: string,
    readonly customerInfo: UnvalidatedCustomerInfo,
    readonly shippingAddress: UnvalidatedAddress
  ) { }
}

class UnvalidatedCustomer {
  constructor(
    readonly name: string,
    readonly email: string
  ) { }
}

type UnvalidatedAddress = ...

/**
 * 입력 command
 */
type Command<D> = {
  readonly data: D,
  readonly timestamp: DateTime;
  readonly userId: string;
  // 기타 정보
}

class PlaceOrderCommand implements Command<UnvalidatedOrder> {
  constructor(
    data: UnvalidatedOrder,
    timestamp: DateTime,
    userId: string,
  ) { }
}

/**
 * Public API
 */

// Success output of PlaceOrder workflow
class OrderPlaced {

}

class BillableOrderPlaced {

}

class OrderAcknowledgmentSent {

}

type PlaceOrderEvent =
  | OrderPlaced
  | BillableOrderPlaced
  | OrderAcknowledgmentSent;

// Failure output of PlaceOrder workflow
class PlaceOrderError {

}

type PlaceOrderWorkflow = (i: PlaceOrderCommand) => TaskEither<PlaceOrderError,
  PlaceOrderEvent[]>;
