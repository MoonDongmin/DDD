import * as E from "fp-ts";
import {UnitQuantity} from "../chapter05/example/widget.ts";
import {match} from "ts-pattern";

declare const widgetCode: unique symbol;

class WidgetCode {
    [widgetCode]!: never;

    constructor(readonly value: string) {
    } // 'W'로 시작한 다음 네자리
}

declare const unitQuantity: unique symbol;


class UnitQuantity {
    [unitQuantity]!: never;

    private constructor(readonly value: number) {
        super(); // 아마 VO랑 나중에 결합을 하기 때문에
    }

    static create(i: number): E.Either<ErrPrimitiveConstraints, UnitQuantity> {
        if (num < 1) {
            return E.left(new ErrNumberLessThanMin(min));
        }

        if (num > 1000) {
            return E.left(new ErrNumberGreaterThanMax(max));
        }

        return E.right(new UnitQuantity(i));
    }
}

declare const kilogramQuantity: unique symbol;

class KilogramQuantity {
    [kilogramQuantity]!: never;

    constructor(readonly value: number) {
    } // 0.05에서 100.00 사이
}

const unitQty = new UnitQuantity(1);
const unitQtyEither = UnitQuantity.create(1);
match(unitQtyEither)
    .with(P.when(E.isLeft), (e) => console.log(`Failure, Message is ${e}`))
    .with(P.when(E.isRight), (unitQty) => console.log(`Success, Value is ${unitQty}, inner value is 
    ${unitQty.right.value}`))
    .exhaustive();