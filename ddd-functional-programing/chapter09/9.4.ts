import type { Either } from "fp-ts/lib/Either";
import type { ValidatedOrder } from "./9.3";
import { pipe } from "fp-ts/lib/function";
import { ord } from "fp-ts";

type PriceOrder =
  (d: GetProductPrice) // 의존
    => (i: ValidatedOrder) // 입력
      => Either<PlaceOrderError, PricedOrder>; // 출력

type GetProductPrice = (i: ProductCode) => Price;

type PriceOrder =
  (d: GetProductPrice) // 의존
    => (i: ValidatedOrder) // 입력
      => PricedOrder; // 출력

const priceOrder: PriceOrder =
  (getProductPrice) => ({ orderId, customerInfo, shippingAddress, billingAddress, lines }) => {
    const pricedLines = lines.map(toPricedOrderLine(getProductPrice));

    const amountToBill = pipe(
      pricedLines.map(line => line.linePrice),
      BillingAmount.sumPrices,
    );

    return new PricedOrder(
      orderId,
      customerInfo,
      shippingAddress,
      billingAddress,
      pricedLines,
      amountToBill,
    );
  }

// 가격 목록을 합산하여 청구 금액을 만듬
// 총액이 범위를 벗어나면 예외를 발생시킴
class BillingAmount {
  [BillingAmount]: never;
  constructor(readonly value: number) {

  }

  static create(i: number): BillingAmount {

  }

  static sumPrices(prices: Price[]) {
    return this.create(prices.sumBy(price => price.value));
  }
}

// ValidatedOrderLine을 PricedOrderLine으로 변환함
const toPricedOrderLine = (getProductPrice: GetProductPrice) => (i: ValidatedOrderLine) => {
  const price = getProductPrice(i.productCode);

  return new toPricedOrderLine(
    i.orderLineId,
    i.productCode,
    i.quantity,
    price.multiply(i.quantity),
  );
}

// 가격에 소수점 수량을 곱함
// 새로운 가격이 범위를 벗어나면 예외를 발생시킴
class Price {
  ...
  multiply(qty: OrderQuantity): Price {
    return Price.create(qty.value * this.value);
  }
}