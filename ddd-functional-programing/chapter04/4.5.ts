declare const checkNumber: unique symbol;

class CheckNumber {
    [checkNumber]!: never;

    constructor(readonly value: number) {
    }
}

declare const cardNumber: unique symbol;

class CardNumber {
    [cardNumber]!: number;

    constructor(readonly value: number) {
    }
}

type CardType = "Visa" | "Mastercard";

class CreditCardInfo {
    constructor(
        readonly cardType: CardType,
        readonly cardNumber: CardNumber,
    ) {
    }
}

type PaymentMethod = Cash | CheckNumber | CreditCardInfo;

declare const paymentAmount: unique symbol;

class PaymentAmount {
    [paymentAmount]!: never;

    constructor(readonly value: number) {
    }
}

type Currency = "EUR" | "USD";

type PayInvoice = (i: UnpaidInvoice, j: Payment) => PaidInvoice;

type ConvertPaymentCurrency = (i: Payment, J: Currency) => Payment;