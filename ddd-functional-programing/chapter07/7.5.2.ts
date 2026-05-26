class PricingError {
    constructor(
        readonly message: string
    ) { }
}

type PricedOrder =
    (dep: GetProductOrder) // 입력  
        => (i: ValidatedOrder) // 의존
            => Either<PricingError, PricedOrder>; // 출력 