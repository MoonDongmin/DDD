import type { Option } from "fp-ts/lib/Option";
import type { OrderId } from "../chapter05/example/order-id";
import { option } from "fp-ts";

declare const htmlString: unique symbol;

type HtmlString = string & { [htmlString]: never };

class OrderAcknowledgment {
    constructor(
        readonly emailAddress: EmailAddress,
        readonly letter: HtmlString
    ) {

    }
}

type CreateOrderAcknowledgmentLetter = (i: PricedOrder) => HtmlString;

// type SendOrderAcknowledgment = (i: OrderAcknowledgment) => void;

type SendOrderAcknowledgment = (i: OrderAcknowledgment) => boolean;

enum SendResult {
    Sent = 'Sent',
    NotSent = "NotSent",
}

type SendOrderAcknowledgment = (i: OrderAcknowledgment) => SendResult;

class OrderAcknowledgmentSent {
    constructor(
        readonly emailAddress: EmailAddress,
        readonly orderId: OrderId
    ) { }
}

type AcknowledgeOrder =
    (dep1: CreateOrderAcknowledgmentLetter, dep2: SendOrderAcknowledgment) // 의존
        => (i: PricedOrder) // 입력
            => Option<OrderAcknowledgmentSent>; // 출력
            