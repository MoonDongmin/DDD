class BrokerageAccount {
    accountNumber: string;
    customer: Customer;
    investments: Map<Investmens>;


    constructor(accountNumber: string, customer: Customer, investments: Map<Investmens>) {
        this.accountNumber = accountNumber;
        this.customer = customer;
        this.investments = investments;
    }

    get getCustomer(): Customer {
        return this.cunstomer;
    }

    get getInvestment(stockSymbol: string): Investment {
        return this.investments.get(stockSymbol);
    }
}
