import { ordering } from "fp-ts";
import { OrderId } from "./9.1";
import type { ValidatedOrder } from "./9.3";
import { flow, pipe } from "fp-ts/lib/function";

// Validate Order 
declare const checkdAddress: unique symbol;

class CheckedAddress {
  [checkdAddress]!: never;

  constructor(
    readonly value: UnvalidatedAddress
  ) { }
}

type CheckProductCodeExists = (i: ProductCode) => Boolean
type CheckAddressExists = (i: UnvalidatedAddress) => CheckedAddress
type validateOrder = (d1: CheckProductCodeExists, d2: CheckAddressExists) // 의존
  => (i: UnvalidatedOrder) // 입력
    => ValidatedOrder // 출력



const toCustomerInfo = (i: UnvalidatedCustomerInfo) => ...

const toAddress = (checkAddressExists: CheckAddressExists) => (i: unvalidatedAddress) => ...

const predicateToPassthru = ...

const toProductCode = (checkProductCodeExists: CheckProductCodeExists) => (i: string) => ...

const toOrderQuantity = (i1: CheckProductCodeExists, i2: Quantity) => ...

const toValidatedOrderLIne = (checkProductExists: CheckProductCodeExists) =>
(i: UnvalidatedOrderLine) => ...

// Implementation of ValidateOrder step

const validateOrder: ValidatedOrder = (checkProductCodeExists, checkAddressExists) =>
(unvalidatedOrder) => {
  const orderId = OrderId.create(unvalidatedOrder.orderId);

  ...
  const shippingAddress = toAddress(checkAddressExists)(unvalidatedOrder.shippingAddress);
  const lines = unvalidatedOrder.lines.map(toValidatedOrderLIne(checkProductCodeExists))  ;

  return new validateOrder(orderId, ..., shippingAddress, ..., lines);
}


const toPlaceOrderEvents =
(createAck: createOrderAcknowledgmentLetter, sendAck: SendOrderAcknowledgment)
=> (priceOrder: PricedOrder): PlaceOrderEvent[] => pipe(
  priceOrder,
  acknowledgeOrder(createAck, sendAck),
  createEvents(priceOrder),
);


const placeOrder = (
  checkCode: CheckProductCodeExists,
  checkAddress: CheckAddressExists,
  getPrice: GetProductPrice,
  createAck: CreateOrderAcknowledgmentLetter,
  sendAck: SendOrderAcknowledgment,
): PlaceOrderWorkflow => flow(
  valdiateOrder(checkCode, checkAddress),
  priceOrder(getPrice),
  toPlaceOrderEvents(createAck, sendAck),
);