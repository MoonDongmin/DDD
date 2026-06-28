class ShippableOrderLine {
  constructor(
    readonly productCode: ProductCode,
    readonly quantity: number,
  ) { }
}

class ShippableOrderPlaced {
  constructor(
    readonly orderId: OrderId,
    readonly shippingAddress: Address,
    readonly shipmentLines: ShippableOrderLine[]
  ) { }
}

type PlacedOrderEvent =
  | ShippableOrderPlaced
  | BillableOrderPlaced
  | OrderAcknowledgmentSent;