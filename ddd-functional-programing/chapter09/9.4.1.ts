import { pipe } from "fp-ts/lib/function";
import type { Option } from "fp-ts/lib/Option";

declare const htmlString: unique symbol;

class HtmlString {
  [htmlString]!: never;

  constructor(readonly value: string) { }
}

class OrderAcknowledgement {
  constructor(
    readonly emailAddress: EmailAddress,
    readonly letter: HtmlString,
  ) {

  }
}

type CreateOrderAcknowledgementLetter = (i: PricedOrder) => HtmlString;

type SendResult = 'Sent' | 'NotSent';

type SendOrderAcknowledgement = (i: OrderAcknowledgement) => SendResult;

type AcknowledgeOrder = (
  dep1: CreateOrderAcknowledgementLetter,
  dep2: SendOrderAcknowledgement, // 의존
) => (
  i: PricedOrder, // 입력
) => Option<OrderAcknowledgementSent>; // 출력

const acknowledgeOrder: AcknowledgeOrder =
  (createAcknowledgmentLetter, sendAcknowledgment) => pricedOrder => pipe(
    createAcknowledgmentLetter(pricedOrder),
    letter => new OrderAcknowledgement(pricedOrder.customerInfo.emailAddress, letter),

    // 승인 메일이 성공적으로 전송되면 해당 이벤트를 반환, 그렇지 않으면 None 반환
    acknowledgment => match(sendAcknowledgment(acknowledgment))
      .with(Sent, () => O.some(
        new OrderAcknowledgementSent(
          pricedOrder.orderId,
          pricedOrder.customerInfo.emailAddress,
        ),
      ))
      .with(isNotEmittedStatement, () => O.none)
      .exhautive(),
  )