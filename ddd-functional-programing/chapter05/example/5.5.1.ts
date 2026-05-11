class PlaceOrderEvents {
    constructor(
        readonly acknowledgmentSent: AcknowledgmentSent,
        readonly orderPlaced: OrderPlaced,
        readonly billableOrderPlaced: BillableOrderPlaced
    ) {
    }
}

type PlaceOrder = (i: UnvalidatedOrder) => PlaceOrderEvents;

declare const envelopeContents: unique symbol;

class EnvelopeContents {
    [envelopeContents]!: never;

    constructor(readonly value: string) {
    }
}

type CategorizedMail = QuoteForm | OrderForm;
type CategorizeInboundMail = (i: EnvelopeContents) => CategorizedMail;

type CalculatePrices = (i: OrderForm) => (j: ProductCatelog) => PricedOrder;

class CalculatePricesInput {
    constructor(
        readonly orderForm: OrderForm,
        readonly productCatalog: ProductCatlog,
    ) {
    }
}

type CalculatePrices = (i: CalculatePrices) => PricedOrder;