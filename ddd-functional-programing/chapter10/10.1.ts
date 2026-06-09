type CheckAddressExists = (i: UnvalidatedAddress) => CheckAddress;

type AddressValidationError = "InvalidFormat" | "AddressNotFound";

type CheckAddressExists =
    (i: UnvalidatedAddress) => Either<AddressValidationError, CheckedAddress>;