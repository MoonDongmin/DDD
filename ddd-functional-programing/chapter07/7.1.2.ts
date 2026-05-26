type Command<D> = {
    readonly data: D;
    readonly timestamp: DateTime;
    readonly userId: string;
}

class PlaceOrder implements Command<UnvalidatedOrder>{
    constructor(
        readonly data: UnvalidatedOrder,
        readonly  timestamp: DateTime,
        readonly userId: string,
    ) {
    }
}