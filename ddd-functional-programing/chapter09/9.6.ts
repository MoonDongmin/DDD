import { flow, pipe } from "fp-ts/lib/function";
import type { CheckAddressExists, ValidatedOrder } from "./9.3";

// 저수준 헬퍼 함숟르
const toAddress = (d: CheckAddressExists) => (i: UnvalidatedAddress) => ...
const toProductCode = (d: CheckProductCodeExists) => (i: string) => ...

// 헬퍼 함수
const toValidatedOrderLine =
  (checkProductExists: CheckProductExists) => // toProductCode에 필요한 매개변수
    (i: UnvalidatedOrderLine) => {
      // 라인의 구성 요소 생성
      const orderLineId = ...
      const productCode = pipe(
        i.productCode,
        toProductCode(checkProductExists), // 서비스 사용
      )
    }

const validateOrder: ValidatedOrder = (checkProductCodeExists, checkAddressExists) =>
  (unvalidatedOrder) => {
  ...
const shippingAddress = toAddress(checkAddressExists)(unvalidatedOrder.shippingAddress);
const lines = pipe(unvalidatedOrder.lines, A.map(toValidatedOrderLine(
  checkProductCodeExists
)));

return new toValidatedOrderLine(... , shippingAddress, lines);
}

const placeOrder: (
  checkCode: CheckProductCodeExists, // 의존
  checkAddress: CheckAddressExists, // 의존
  getPrice: GetProductPrice, // 의존
  createAck: CreateOrderAcknowledgmentLetter, // 의존
  sendAck: SendOrderAcknowledgmenet, // 의존
) => PlaceOrderWorkflow = flow(
  command => command.data,
  validateOrder(checkCode, checkAddress),
  priceOrder(getPrice),
  (pricedOrder) => pipe(
    (pricedOrder),
    acknowledgeOrder(createAck, sendAck),
    createEvents(pricedOrder),
  )
);