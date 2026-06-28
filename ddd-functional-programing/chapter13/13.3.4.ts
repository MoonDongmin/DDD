class CommentLine {
  constructor(
    readonly value: string
  ) { }
}

type PricedOrderLine =
  | PricedOrderProductLine
  | CommentLine;


const priceOrder: PriceOrder = (getPricingFunction) => ({
  pricingMethod,
  orderLines,
}: ValidatedOrder) => {
  const getProductPrice = getPricingFunction(pricingMethod);
  const productOrderLines = orderLines.map(toPricedOrderLine(getProductPrice));
  const orderLines = match(pricingMethod)
    .with("Standard", () => productOrderLines)
    .with(P.instanceOf(Promotion), ({ value: promoCode }) => {
      const commentLine = CommentLine.create(`프로모션 ${promoCode} 적용됨`);

      return productOrderLines.create([commentLine]);
    })
    .exhaustive();

  return new PricedOrder(..., orderLines, ...);
}