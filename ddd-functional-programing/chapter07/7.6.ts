import type { Either } from "fp-ts/lib/Either";
import type { TaskEither } from "fp-ts/lib/TaskEither";
import type { TaskOption } from "fp-ts/lib/TaskOption";

type ValidateOrder =
    (i: UnvalidatedOrder) // 입력
        => TaskEither<ValidationError[], ValidatedOrder>; // 출력

type PriceOrder =
    (i: ValidateOrder) // 입력
        => Either<PricingError, PricedOrder>; // 출력

type AcknowledgeOrder =
    (i: PriceOrder) // 입력
        => TaskOption<OrderAcknowledgmentSent>; // 출력

type CreateEvents =
    (i: PriceOrder) // 입력
        => PlaceOrderEvent[]; // 출력   

type ValidatedOrder =
    (d1: CheckProductCodeExists, d2: CheckAddressExists) // 의존
        => (i: UnvalidatedOrder) // 입력
            => TaskEither<ValidationError[], ValidatedOrder>;  // 출력

type PriceOrder =
    (dep: GetProductPrice) // 의존
        => (i: ValidatedOrder) // 입력
            => PricedOrder; // 출력

type ValidatedOrder = (i: UnvalidatedOrder) // 입력
    => TaskEither<ValidationError[], ValidatedOrder>; // 출력

type PriceOrder = (i: ValidatedOrder) // 입력 
    => Either<PricingError, PricedOrder>; // 출력

type PlaceOrderWorkflow = (i: PlaceOrder) // 입력 
    => TaskEither<PlaceOrderError, PlacedOrderEvent[]>; // 출력