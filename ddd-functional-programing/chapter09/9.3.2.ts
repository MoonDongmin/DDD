import { flow, pipe } from "fp-ts/lib/function";
import type { ValidatedOrder } from "./9.3";
import { match } from "fp-ts/lib/EitherT";
import { KilogramQuantity } from "../chapter05/example/widget";

const toValidatedOrderLine =
  (checkProductCodeExists: CheckProductCodeExists) => // 의존
    ({ orderLineId, productCode, quantity }: UnvalidatedOrderLine) => // 입력
      new toValidatedOrderLine(
        orderLineId.create(orderLineId),
        pipe(productCode, toProductCode(checkProductCodeExists)),
        pipe(quantity, toOrderQuantity(productCode)),
      )


const validateOrder: ValidatedOrder =
  (checkProductCodeExists, checkAddressExists) => (unvalidatedOrder) => {
    const orderId = ...
    const customerInfo = ...
    const shippingAddress ...
    const orderLines = unvalidatedOrder.lines
      .map(toValidatedOrderLine(checkProductCodeExists));
  ...
}

const toOrderQuantity = (productCode: ProductCode) =>
  (quantity: number) => match(productCode)
    .with(P.instanceOf(Widget), _ => UnitQuantity.create(quantity))
    .with(P.instanceOf(Gizmo), _ => KilogramQuantity.create(quantity))
    .exhaustive();

const toProductCode = (checkProductCodeExists: CheckProductCodeExists) => flow(
  toProductCode.create,
  checkProductCodeExists,
); // 반환값은 boolean임 