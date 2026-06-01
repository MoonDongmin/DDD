import { pipe } from "fp-ts/lib/function";
import type { CheckAddressExists, ValidatedOrder } from "./9.3";

const toAddress = (checkAddressExists: CheckAddressExists) => (i: UnvalidatedAddress) => {
  // 원격 서비스를 호출하여 주소 확인
  const { addressLine1, addressLine2, addressLine3, addressLine4, city, zipCode } =
    checkAddressExists(i);

  // Address 생성
  return new Address(
    String50.create(addressLine1),
    String50.createOption(addressLine2),
    String50.createOption(addressLine3),
    String50.createOption(addressLine4),
    String50.create(city),
    zipCode.create(zipCode),
      );
}

const validateOrder: ValidatedOrder =
  (checkProductCodeExists, checkAddressExists) =>
    (unvalidatedOrder) => {
      const orderId = ...
      const customerInfo = ...
      const shippingAddress = pipe(unvalidatedOrder, ShippingAddress,
        toAddress(checkAddressExists)
      );

      return new validateOrder(...);
    }