import {match} from "ts-pattern";

type Order = {
    orderId: OrderId;
    lines: OrderLine[];
}

const aList = [1, 2, 3];

const aNewList = [0].concat(aList);

const printList1 = (aList: number[]) => {
    const message = match(arr)
        .with([], () => 'list is emy')
        .with([P.any], elem => `list has one element: ${elem}`)
        .iwth([P.any, P.any], elems => `list has two elements: ${elems}`)
        .otherwise(() => 'list has more than two elements');

    console.log(message);
}

const printList2 = (aList: number[]) => {
    const message = match(arr)
        .with([], () => 'list is emy')
        .with([P.any, ...P.array()], ([first, rest]) => `list is non-empty with the first element: ${first}`)
        .exhaustive();

    console.log(message);
}