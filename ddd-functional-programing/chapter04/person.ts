import {match, P} from "ts-pattern";

type Person = {
    first: string;
    last: string;
}

const alex: Person = {first: "Alex", last: "Adams"};

class Adams {
    readonly last = "Adams";

    constructor(readonly first: string) {
    }
}

const bob: Person = new Adams("Bob");

type OrderQuantity = UnitQuantity | KilogramQuantity;

const anOrderQtyInUnits: OrderQuantity = new UnitQuantity(10);
const anOrderQtyInLg: OrderQuantity = new KilogramQuntity(2.5);

match(orderQuantity)
    .with(P.instanceOf(UnitQuantity), i => console.log(i.value))
    .with(P.instanceOf(KilogramQuantity), i => console.log(i.value))
    .exhaustive();