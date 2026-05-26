type GetProductPrice = (i: ProductCode) => Price;

type PriceOrder =
    (dep: GetProductPrice) // 의존
        => (i: ValidatedOrder) // 입력
            => PriceOrder;         // 출력
            