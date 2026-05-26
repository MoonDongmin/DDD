class PlaceOrder {
    constructor(
        readonly orderForm: UnvalidatedOrder,
        readonly timestamp: DateTime,
        readonly userId: string
    ) {
    }
}