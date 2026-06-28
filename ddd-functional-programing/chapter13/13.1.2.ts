type AddShippingInfoToOrder = (i: PricedOrder) => PricedOrderWithShippingInfo;

enum ShippingMethod {
  PostalService = "PostalService",
  Fedex24 = "Fedex24",
  Fedex48 = "Fedex48",
  Ups48 = "Ups48",
}

class ShippingInfo {
  constructor(
    readonly shippingMethod: ShippingMethod,
    readonly shippingCost: Price,
  ) { }
}

class PricedOrderWithShippingMethod {
  constructor(
    readonly shippingInfo: ShippingInfo,
    readonly pricedOrder: PricedOrder,
  ) { }
}

type CalculateShippingCost = (i: PricedOrder) => ShippingCost;
type AddShippingInfoToOrder = (dep: CalcualteShippingCost) => (i: PricedOrder) =>
  PricedOrderWithShippingInfo;

const addShippingInfoToOrder: AddShippingInfoToOrder = (calculateShippingCost) =>
  (pricedOrder) => pipe(
    pricedOrder,
    calculateShippingCost,
    (shippingCost) => new ShippingInfo(shippingMethod, shippingCost),
    (shippingInfo) => new PricedOrderWithShippingInfo(
      pricedOrder.OrderId,
      ...
      shippingInfo,
    )
  )

// set up local versions of the pipeline stages
// using partial application to bake in the dependencies
const addShippingInfo = addShippingInfoToOrder(calculateShippingCost);

// compose the pipeline from the new one-parameter functions
flow(
  unvalidatedOrder,
  validateOrder,
  priceOrder,
  addShippingInfo,
  ...
)