import type {Option} from "fp-ts/lib/Option";

class UnvalidatedAddress {
}

class ValidatedAddress {
    private constructor() {
    }
}

type AddressValidationService = (i: UnvalidatedAddress)
    => Option<ValidatedAddress>;

class UnvalidatedOrder {
    readonly shippingAddress: UnvalidatedAddress
}

class ValidatedOrder {
    readonly shippingAddress: ValidatedAddress
}