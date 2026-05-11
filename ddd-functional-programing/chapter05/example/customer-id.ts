declare const customerId: unique symbol;

export class CustomerId {
    [customerId]!: never; // 브랜드
    constructor(readonly value: number) {
    }
}