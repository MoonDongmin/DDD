type PlaceOrderError =
    | ValidationError
    | ProductOutOfStock
    | RemoteServiceError;

class ValidationError extends Error {
    constructor(
        readonly details: string,
        message?: string
    ) {
        super(message);
    }
}

class ProductOutOfStock extends Error {
    constructor(readonly details: ProductCode,
                message?: string) {
        super(message);
    }
}

class RemoteServiceError extends ValueObject {
    constructor(
        readonly service: ServiceInfo,
        readonly exception: Error
    ) {
        super();
    }
}