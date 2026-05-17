class MoneyTransfer {
    constructor(
        readonly id: MoneyTransferId,
        readonly toAccount: AccountId,
        readonly fromAccount: AccountId,
        readonly amount: Money,
    ) {
    }
}