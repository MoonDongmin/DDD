declare const orderId: unique symbol;

export class OrderId {
  [orderId]!: never;

  // value를 통해 내부 값 접근
  private constructor(readonly value: string) {
  }

  // OrderId의 "스마트 생성자" 정의
  // string -> OrderId
  public static create(str: string){
    if (!str) {
      // 일단은 Either 대신 예외 사용
      throw Error(`must not be null or empty`);
    }

    if (50 < str.length) {
      throw Error(`must not be more than 50 chars`);
    }

    return new OrderId(str);
  }
} 