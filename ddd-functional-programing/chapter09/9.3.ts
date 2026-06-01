import type { TaskEither } from "fp-ts/lib/TaskEither";
import { OrderId } from "./9.1";

// export type CheckAddressExists =
//   (i: UnvalidatedAddress) => TaskEither<AddressValidationError, CheckAddress>;

// export type ValidatedOrder =
//   (d1: CheckProductCodeExists, d2: CheckAddressExists) // 의존
//     => (i: UnvalidatedOrder) // 입력
//       => TaskEither<ValidationError[], ValidatedOrder>; // 출력


export type CheckAddressExists = (i: UnvalidatedAddress) => CheckedAddress;

export type ValidatedOrder =
  (d1: CheckProductCodeExists, d2: CheckAddressExists) // 의존
    => (i: UnvalidatedOrder) // 입력
      => ValidatedOrder; // 출력

const validateOrder: ValidatedOrder =
  (checkProductCodeExists, checkAddressExists) =>
    ({ orderId, customerInfo, shippingAddress }) => {
      const orderId = OrderId.create(orderId);
      const customerInfo = toCustomerInfo(customerInfo);
      const shippingAddress = toAddress(shippingAddress);

      // UnvalidatedOrder의 다른 속성들도 동일하게 처리함
      // 모든 필드를 준비한 후, 새 ValidatedOrder를 생성하고 반환

      return new validateOrder(
        orderId,
        customerInfo,
        shippingAddress,
        ...,
      );
    }

function toCustomerInfo({ firstName, lastName, emailAddress }: UnvalidatedCustomerInfo):
  CustomerInfo {
  // CustomerInfo의 각 속성을 생성 시 유효하지 않은 경우 예외 발생

  // PersonalName을 생성
  const name = new PersonalName(
    String50.create(firstName),
    String50.create(lastName),
  );

  // CustomerInfo를 생성 후 반환
  return new toCustomerInfo(
    name,
    emailAddress.create(emailAddress),
  );
}