type ValidateOrder = (i: UnvalidatedOrder) => Either<ValidationError, ValidatedOrder>;

type PriceOrder = (i: ValidatedOrder) => Either<PricingError, PricedOrder>;

type AcknowledgeOrder = (i: PricedOrder) => Option<OrderAcknowledgmentSent>;
type CreateEvents = (i1: PricedOrder, i2: Option<OrderAcknowledgmentSent>)
    => PlaceOrderEvent[];


type PlaceOrderError = ValidationError | PricingError;

const placeOrder = flow(
    validateOrder,
    Either.flatMap(priceOrder),
)

const placeOrder = flow(
    validateOrder,
    Either.flatMap(priceOrder),
    Either.map(acknowledgeOrder),
    Either.map(createEevents),
);

(i: UnvalidatedOrder) => Either<PlaceOrderError, Array<PlaceOrderEvent>>;