import { taskOption } from "fp-ts";
import type { Task } from "fp-ts/lib/Task";

type SendOrderAcknowledgment = (i: SendOrderAcknowledgment) => Task<SendResult>;

type AcknowledgeOrder =
    (dep1: CreateOrderAcknowledgmentLetter, dep2: SendOrderAcknowledgment) // 의존
        => (i: PricedOrder) // 입력
            => TaskOption<OrderAcknowledgmentSent>; // 출력