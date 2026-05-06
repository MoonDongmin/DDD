type Either<E, A> = Left<E> | Right<A>;

type PayInvoice = (i: UnpaidInvoice, j: Payment) => Either<PaymentError, PaidInvoice>

type PaymentError = CardTypeNotRecognized | PaymentRejected | PaymentProviderOffline;