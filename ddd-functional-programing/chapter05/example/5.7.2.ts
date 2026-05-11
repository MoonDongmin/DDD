class UnpaidInvoiceInfo {/*...*/
}

class PaidInvoiceInfo {/*...*/
}

type InvoiceInfo = UnpaidInvoiceInfo | PaidInvoiceInfo;

class InvoiceId {/*...*/
}

class Invoice {
    constructor(
        invoice: InvoiceInfo,
        invoiceInfo: InvoiceInfo
    )
}

type UnpaidInvoice = {
    invoiceId: InvoiceId,
    /*...*/
}
type PaidInvoice = {
    invoiceId: InvoiceId,
    /*...*/
}

type Invoice = UnpaidInvoice | PaidInvoice;

const invoice = new PaidInvoice(invoiceId, ...);
match(invoice)
    .with(P.instanceOf(UnpaidInvoice), ({invoiceId}) => console.log("The unpaid invoiceId is %A"))
    .with(P.instanceOf(PaidInvoice), ({invoiceId}) => console.log("The paid invoiceId is %A"))
    .exhaustive();