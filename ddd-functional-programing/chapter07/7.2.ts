class ValidatedOrder {
    constructor(
        readonly orderId: OrderId,
        readonly customerInfo: CustomerInfo,
        readonly shippingAddress: Address,
        readonly billingAddress: Address,
        readonly orderLines: ValidatedOrderLine[],
    ) {
    }
}

class PricedOrder {
    constructor(
        readonly orderId: OrderId,
        readonly customerInfo: CustomerInfo,
        readonly shippingAddress: Address,
        readonly billingAddress: Address,
        readonly orderLines: PricedOrderLine[],
        readonly amountToBill: BillingAmount
    ) {
    }
}

type Order = UnvalidatedOrder | ValidatedOrder | PricedOrder;