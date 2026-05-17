import {pipe} from "fp-ts/es6/function";
import {produce} from "immer";

const changeOrderLiePrice
    = (order: Order, orderLineId: OrderLineId, newPrice: number) => {
    // 1. orderLineId로 변경할 orderLine을 찾음
    const orderLine = pipe(order.OrderLines, findOrderLine(orderLineId));

    // 2. 새 가격을 반영한 새 OrderLine을 만든다
    const newOrderLine = produce(orderLine, draft => {
        draft.price = newPrice
    });

    // 3. 이전 항목을 새 항목으로 교체한 새 항목 리스트를 만든다
    const newOrderLines = pipe(order.OrderLines, replaceOrderLine(orderLineId, newOrderLine));

    // 4. 새 AmountToBill을 만든다
    const newAmountToBill = newOrderLines.reducee((acc, cur) => acc + cur.price, 0);

    // 5. 새 리스트로 교체한 새 Order를 반환한다
    return produce(order, draft => {
        draft.orderLines = newOrderLines;
        draft.amountToBill = newAmountToBill;
    })
}