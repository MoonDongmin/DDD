class Order {
    constructor(
        readonly orderId: OrderId,
        readonly customer: CustomerId,
        readonly orderLines: OrderLine[],
        // 기타
    ) {
    }
}