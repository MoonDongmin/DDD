type UnitQuantity = number;

declare const unitQuantity: unique symbol;

class UnitQuantities {
    [unitQuantity]!: never;

    constructor(readonly value: number[]) {
    }
}