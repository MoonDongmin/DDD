class BrokerageAccount {
    private accountNumber: string;
    private customerSocialSecurityNumber: string;

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

    public getInvestments(): Set<Investment> {
        const sqlQuery = `SELECT *
                          FROM INVESTMENT
                          WHERE BROKERAGE_ACCOUNT = '${this.accountNumber}'`;
        return QueryService.findInvestmentsFor(sqlQuery);
    }
}
