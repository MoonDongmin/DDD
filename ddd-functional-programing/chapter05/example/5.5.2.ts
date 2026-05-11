// type ValidateOrder = (i: UnvalidatedOrder) => Either<ValidtationError[], ValidatedOrder>

type ValidateOrder = (i: UnvalidateOrder) => Task<Either<ValidationEror[], ValidatedOrder>>;