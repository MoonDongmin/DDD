type GetProductPrice = (i: ProductCode) => Price;

// type GetPricingFunction = (i: Option<PromotionCode>) => GetProductPrice;

type PricingMethod =
  | "Standard"
  | PromtionCode

class ValidatedOrder {
  ... // 이전과 동일
  readonly pricingMethod: PricingMethod;
}

type GetPricingFunction = (i: PricingMethod) => GetProductPrice;

type PriceOrder =
  (dep: GetPricingFunction) // 새 의존
    => (i: ValidatedOrder) // 입력
      => PricedOrder: // 출력
