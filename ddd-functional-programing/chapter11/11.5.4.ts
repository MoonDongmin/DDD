// 도메인 타입
class Order {
  ...
  readonly lines: Iteratable<OrderLine>
}

// 해당하는 DTO 타입
class OrderDto {
  ...
  readonly lines: OrderLineDto[]
}

// 도메인 타입
class Price {
  constructor(
    readonly value: number,
  ) { }
}
type PriceLookup = Map<ProductCode, Price>;

// 맵을 표현하는 DTO 타입
type PriceLookupPair = [string, number] as const ;
class PriceLookupDto {
  constructor(readonly kvPairs: PriceLookupPair[]) { }
}