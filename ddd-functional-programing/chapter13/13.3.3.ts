import { match } from "fp-ts/lib/EitherT";

type GetStandardPriceTable =
  // 입력 없음 -> 표준 가격 반환
  () => Map<ProductCode, Price>;

type GetPromotionPriceTable =
  // 프로모션 입력 -> 프로모션 가격 반환
  (i: PromotionCode) => Map<ProductCode, Price>;

const getPricingFunction =
  (standardPrices: GetStandardPriceTable) =>
    (promoPrices: GetPromotionPriceTable) =>
    : GetPricingFunction => {

  // 표준 가격 함수
  const getStandardPrice: GetProductPrice = (productCode) => standardPrices().get(productCode);

  // 프로모션 가격 함수
  const getPromotionPrice = (promoCode: PromotionCode): GetProductPrice =>
    (productCode) => promoPrices(promoCode).get(productCode) ?? getStandardPrice(productCode);

  // GetPricingFunction에 맞는 함수 반환
  return (i: PricingMethod) => match(i)
    .with("Standard", () => getStandardPrice)
    .with(P.instanceOf(Promotion), ({ value: promoCode }) => getPromotionPrice(promoCode))
    .exhaustive();
}