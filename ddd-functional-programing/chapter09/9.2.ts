type ValidateOrder = (
  dep1: CheckProductCodeExists,
  dep2: CheckAddressExists, // 의존
) => (
  i: UnvalidatedOrder, // 입력
) => ValidatedOrder; // 출력

const validateOrder: ValidateOrder =
(checkProductCodeExists, checkAddressExists) =>
  // CheckProductCodeExists와 CheckAddressExists로 타입 추론
(unvalidatedOrder) => { // UnvalidatedOrder로 타입 추론
  ...
return ... // 출력 타입이 ValidatedOrder 이어야 함
}