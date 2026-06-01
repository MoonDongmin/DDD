import type { CheckAddressExists } from "./9.3"

it("If product exists, vlaidation succeeds", () => {
  // arrange: 서비스 의존의 스텁 버전 설정
  const checkAddressExists: CheckAddressExists = address => new CheckedAddress(address);

  // 성공
  const checkProductCodeExists :CheckProductCodeExists = _ => true; // 성공

  // arrange: 입력 설정
  const unvalidatedOrder = ...

  // act: validateOrder 호출
  const result = validateOrder(checkProductCodeExists, checkAddressExists) ...

  // assert: 결과가 ValidatedOrder 인지 확인, 오류가 아님
  ... 
})


it("If product exists, vlaidation succeeds", () => {
  // arrange: 서비스 의존의 스텁 버전 설정
  const checkAddressExists: CheckAddressExists = address => new CheckedAddress(address);

  // 성공
  const checkProductCodeExists :CheckProductCodeExists = _ => false; // 실패

  // arrange: 입력 설정
  const unvalidatedOrder = ...

  // act: validateOrder 호출
  const result = validateOrder(checkProductCodeExists, checkAddressExists) ...

  // assert: 결과가 실패인지 확인
  ... 
})