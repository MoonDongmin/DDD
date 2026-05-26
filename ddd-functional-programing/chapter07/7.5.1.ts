import type { Either } from "fp-ts/lib/Either";

type CheckProductCodeExists = (i: ProductCode) => boolean;

type TaskEither<E, T> = Task<Either<E, T>>;

type CheckAddressExists =
    (i: UnvalidatedAddress) => TaskEither<AddressValidationError, CheckedAddress>;

type ValidateOrder = 
(d1: CheckAddressExists, d2: CheckAddressExists) // 의존
=> (i: UnvalidatedOrder) // 입력
=> TaskEither<ValidationError[], ValidatedOrder>; // 출력 