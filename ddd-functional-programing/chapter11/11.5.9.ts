class EitherDto<T, E> {
  constructor(
    readonly isLeft: boolean,
    readonly right: T | null = null,
    readonly left: E | null = null,
  ) { }
}

class PlaceOrderEitherDto {
  constructor(
    readonly isLeft: boolean,
    readonly right: PlaceOrderEventDto[] = [],
    readonly left: PlaceOrderErrorDto | null = null,
  ) { }
}