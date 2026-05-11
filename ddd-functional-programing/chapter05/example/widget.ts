declare const widgetCode: unique symbol;

export class WidgetCode {
    [widgetCode]!: never;

    constructor(readonly value: string) {
    }
}

declare const unitQuantity: unique symbol;

export class UnitQuantity {
    [unitQuantity]!: never;

    constructor(readonly value: number) {
    }
}

declare const kilogramQuantity: unique symbol;

export class KilogramQuantity {
    [kilogramQuantity]!: never;

    constructor(readonly value: number) {
    }
}

