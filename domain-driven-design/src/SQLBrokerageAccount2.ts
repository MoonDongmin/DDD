class BrokerageAccount {
    accountNumber: string;
    customerSocialSecurityNumber: string;

    constructor(accountNumber: string, ssn: string) {
        this.accountNumber = accountNumber;
        this.customerSocialSecurityNumber = ssn;
    }

    public getCustomer(): Customer {
        const sqlQuery = `SELECT *
                          FROM CUSTOMER
                          WHERE SS_NUMBER = '${this.customerSocialSecurityNumber}'`;
        return QueryService.findSingleCustomerFor(sqlQuery);
    }

    public getInvestments(stockSymbol: string): Investment {
        const sqlQuery = `SELECT *
                          FROM INVESTMENT
                          WHERE BROKERAGE_ACCOUNT = '${this.accountNumber}'
                            AND STOCK_SYMBOL = ${stockSymbol}`;
        return QueryService.findInvestmentsFor(sqlQuery);
    }
}
