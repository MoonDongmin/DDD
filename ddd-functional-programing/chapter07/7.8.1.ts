/**
 * Order 생애 주기
 */

import type { TaskEither } from "fp-ts/lib/TaskEither";

// 검증함
class ValidateOrderLine {

}

class ValidateOrder {
  constructor(
    readonly orderId: OrderId,
    readonly customerInfo: CustomerInfo,
    readonly shippingAddress: Address,
    readonly billingAddress: Address,
    readonly orderLines: readonly ValidateOrderLine[]
  ) { }
}

type OrderId = Undefined;

class CustomerInfo {

}

class Address {

}

// 가격 책정함
class PricedOrderLine {

}

class PriceOrder {

}

// 모든 상태들
type Order =
  | UnvalidatedOrder
  | ValidatedOrder
  | PricedOrderLine;

/**
 * 내부 단계 정의
 */

// --- 주문 검증 ---

// ValidateOrder가 의존하는 서비스
type CheckProductCodeExists = (i: ProductCode) => boolean;

class AddressValidationError {

}

class CheckedAddress {

}

type CheckedAddressExists =
  (i: UnvalidatedAddress) => TaskEither<AddressValidationError, CheckedAddress>;

type ValidateOrder =
  (d1: CheckProductCodeExists, d2: CheckedAddressExists) // 의존
    => (i: UnvalidatedOrder) // 입력 
      => TaskEither<ValidationError[], ValidateOrder>; // 출력

class ValidationError { }

// --- 주문 가격 책정 ---

// PriceOrder가 의존하는 섭시ㅡ
type GetProductPrice = (i: ProductCode) => Price;

class PricingError { }

type PriceOrder =
  (d: GetProductPrice) // 의존
    => (i: ValidatdOrder) // 입력
      => Either<PricingError, PricedOrder>; // 출력