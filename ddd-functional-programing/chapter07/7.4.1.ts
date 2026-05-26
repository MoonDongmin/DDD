type CheckProductCodeExists = (i: ProductCode) => boolean;

declare const checkedAddress: unique symbol;

class CheckedAddress {
    [checkedAddress]!: never;

    constructor(
        readonly value: UnvalidatedAddress
    ) {
    }
}

class AddressValidationError {
    constructor(
        readonly message: string
    ) {
    }
}

type CheckAddressExists = (i: UnvalidatedAddress) => Either<AddressValidationError, CheckedAddress>

type ValidateOrder =
    (d1: CheckProductCodeExists, d2: CheckAddressExists)
        => (i: UnvalidatedOrder)
        => Either<ValidatedError, ValidateOrder>;