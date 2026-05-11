type Undefined = never;

type CustomerInfo = Undefined;
type ShippingAddress = Undefined;
type BillingAddress = Undefined;
type OrderLine = Undefined;
type BillingAmount = Undefined;

class Order {
    constructor(
        readonly customerInfo: CustomerInfo,
        readonly shippingAddress: ShippingAddress,
        readonly billingAddress: BillingAddress,
        readonly orderLines: OrderLine[],
        readonly amountToBill: BillingAmount,
    )
}

