import type { OrderId } from "../chapter05/example/order-id";

// 배송 맥락으로 전송할 이벤트
class OrderPriced {
    constructor(
        readonly orderId: OrderId,
        readonly customerInfo: CustomerInfo,
        readonly shippingAddress: Address,
        readonly billingAddress: Address,
        readonly amountToBill: BillingAmount,
        readonly lines: readonly PricedOrderLine[],
    ) { }
}

class BillableOrderPlaced {
    constructor(
        readonly orderId: OrderId,
        readonly billingAddress: Address,
        readonly amountToBill: BillingAmount,
    ) { }
}

class PlaceOrderResult {
    constructor(
        readonly orderPlaced: BillableOrderPlaced,
        readonly billableOrderPlaced: BillableOrderPlaced,
        readonly orderAcknowledgmentSent: Option<OrderAcknowledgmentSent>,
    ) { }
}

type PlaceOrderEvent =
    | BillableOrderPlaced
    | BillableOrderPlaced
    | OrderAcknowledgmentSent;

type CreateEvents = (i: PricedOrder) => PlaceOrderEvent[];