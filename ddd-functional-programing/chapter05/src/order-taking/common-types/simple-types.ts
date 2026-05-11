// 제품 코드 관련
// 제약 조건: "W"로 시작한 후 네 자리 숫자
import {Entity} from "../../../example/5.7.3.ts";

declare const widgetCode: unique symbol;

class WidgetCode {
    [widgetCode]!: never;

    constructor(readonly value: string) {

    }
}

// 제약 조건: "G"로 시작한 후 세 자리 숫자
declare const gizmoCode: unique symbol;

class GizmoCode {
    [gizmoCode]!: never;

    constructor(readonly value: string) {

    }
}

type ProductCode = WidgetCode | GizmoCode;

// Order 수량 관련
declare const unitQuantity: unique symbol;

class UnitQuantity {
    [unitQuantity]!: never;

    constructor(readonly value: number) {

    }
}

declare const kilogramQuantity: unique symbol;

class KilogramQuantity {
    [kilogramQuantity]!: never;

    constructor(readonly value: number) {

    }
}

type OrderQuantity = UnitQuantity | KilogramQuantity;

type Undefined = never;

type OrderId = Undefined;
type OrderLineId = Undefined;
type CustomerId = Undefined;

type CustomerInfo = Undefined;
type ShippingAddress = Undefined;
type BillingAddress = Undefined;
type Price = Undefined;
type BillingAmount = Undefined;

class Order extends Entity<OrderId> {
    constructor(
        readonly orderId: OrderId,
        readonly customerId: CustomerId,
        readonly orderLines: OrderLine[],
        readonly shippingAddress: ShippingAddress,
        readonly billingAddress: BillingAddress,
        readonly billingAddress: BillingAddress,
        readonly amountToBill: BillingAmount
    ) {
        super();
    }
}

class OrderLine extends Entity<OrderLineId> {
    constructor(
        readonly orderLineId: OrderLineId,
        readonly orderId: OrderId,
        readonly productCode: ProductCode,
        readonly orderQuantity: OrderQuantity,
        readonly price: Price
    ) {
        super();
    }
}

class UnvalidatedOrder extends ValueObject {
    constructor(
        readonly orderId: string,
        readonly customerInfo: /*...*/,
        readonly shippingAddress: /*...*/,
        /*...*/
    ) {
        super();
    }
}

class PlaceOrderEvents {
    constructor(
        readonly acknowledgmentSent: AcknowledgementSent,
        readonly orderPlaced: OrderPlaced,
        readonly billableOrderPlaced: BillalbeOrderPlaced,
    ) {
    }
}

type PlaceOrderError = ValidationError |
... // 다른 오류

declare const validationError: unique symbol;

class ValidationError extends Error {
    [validationError]!: never;

    constructor(message: string) {
        super(message);
    }

    static from(e: Error): ValidationError {
        return new ValidationError(e.message)
    }
}

type PlaceOrder = (i: UnvalidatedOrder) => Either<PlaceOrderError, PlaceOrderEvents>;