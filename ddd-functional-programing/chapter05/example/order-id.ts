declare const orderId: unique symbol;

export class OrderId {
    [orderId]!: never; // 브랜드
    constructor(readonly value: number) {
    }
}