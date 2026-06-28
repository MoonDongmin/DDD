// type SaveCustomer = (i: Customer) => DbResult<Unit>;
// type LoadCustomer = (i: CustomerId) => DbResult<Customer>;


type SaveCustomer = (i: WriteModel.Customer) => DbResult<Unit>;
type LoadCustomer = (i: CustomerId) => DbResult<ReadModel.Customer>;

