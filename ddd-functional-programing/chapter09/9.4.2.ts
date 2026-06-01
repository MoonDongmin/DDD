import { pipe } from "fp-ts/lib/function";
import type { OrderId } from "./9.1";

// 배송 맥락으로 전송할 이벤트
class OrderPlaced {
  constructor(
    readonly orderId: OrderId,
    readonly customerInfo: CustomerInfo,
    readonly shippingAddress: Address,
    readonly billingAddress: Address,
    readonly amountToBill: BillingAmount,
    readonly lines: readonly PricedOrderLine[],
  ) {

  }
}

// 청구 맥락으로 전송할 이벹트
// 금액이 0이 아닌 경우에만 생성됨
class BillableOrderPlaced {
  constructor(
    readonly orderId: OrderId,
    readonly billingAddress: Address,
    readonly amountToBill: BillingAmount,
  ) { }
}

type PlaceOrderEvent =
  | OrderPlaced
  | BillableOrderPlaced
  | OrderAcknowledgmentSent;


const createOrderPlacedEvent = (i: PricedOrder) =>
  new OrderPlaced(
    i.orderId,
    i.customerInfo,
    i.shippingAddress,
    i.billingAddress,
    i.amountToBill,
    i.lines,
  );

const createBillingEvent = ({ orderId, billingAddress, amountToBill }: PricedOrder):
  O.Option<BillableOrderPlaced> =>
  amountToBill.value > 0
    ? O.some(new BillableOrderPlaced(orderId, billingAddress, amountToBill))
    : O.none;

const createEvents: CreateEvents = (pricedOrder, acknowledgmentEventOpt) => {
  const event1 = createOrderPlacedEvent(pricedOrder);

  const event20pt = pipe(
    acknowledgmentEventOpt,
    O.map(e => new OrderAcknowledgmentSent(e.orderId, e.emailAddress)),
  );

  const event30pt = createBillingEvent(pricedOrder);
}


// helper to convert an Option into a List
export const optionToList: <T>(opt: O.Option<T>) => Array<T> = O.match(
  () => [],
  (x) => [x],
);

const createEvents: CreateEvents = (pricedOrder, acknowledgmentEventOpt) => [
  pipe(
    pricedOrder,
    createOrderPlacedEvent,
  ),
  ...pipe(
    acknowledgmentEventOptm
    O.map(e => new OrderAcknowledgmentSent(e.orderId, e.emailAddress)),
    optionToList,
  ),
  ...pipe(
    pricedOrder,
    createBillingEvent,
    optionToList,
  ),
];