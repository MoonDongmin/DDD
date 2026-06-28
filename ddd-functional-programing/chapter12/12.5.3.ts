/** Types generated for queries found in "src/order-taking/queries.sql" */

import { record } from "fp-ts";
import { CustomerId } from "../chapter05/example/customer-id";

/** 'ReadOneCustomer' parameters type */
export interface IReadOneCustomerParams {
  customerId: number;
}

/** 'ReadOneCustomer' return type */
export interface IReadOneCustomerResult {
  birthdate: Date | null;
  customer_id: number;
  name: string;
}

/** 'ReadOneCustomer' query type */
export interface IReadOneCustomerQuery {
  params: IReadOneCustomerParams;
  result: IReadOneCustomerResult;
}

const readOneCustomerIR: any = {
  "usedParamSet": { "customerId": true }, "params": [{
    "name":
      "customerId", "required": false, "transform": { "type": "scalar" }, "locs": [{ "a": 70, "b": 80 }]
  }], "statement": "SELECT customer_id, name, birthdate FROM customer WHERE customer_id = :customerId"
};

/**
 * Query generated from SQL:
 * ```
 * SELECT customer_id, name, birthdate FROM customer WHERE customer_id = :customerId
 * ```
 */
const readOneCustomer
  = new PreparedQuery<IReadOneCustomerParams, IReadOneCustomerResult>(
    readOneCustomerIR
  );

const readOneCustomer: (params: IReadOneCustomerParams, dbConnection: IDatabaseConnection)
  => Promise<Array<IReadOneCustomerResult>>;

// const toDomain = (res: IReadOneCustomerResult): E.Either<Error, Customer> => pipe(
//   E.Do,
//   E.bind('customerId', () => CustomerId.create(res.customer_id)),
//   E.bind('name', () => String50.create(res.name)),
//   E.bind('birthdate', () => res.birthdate ? Birthdate.create(res.birthdate) : E.right(O.none)),
//   E.map(scope => new CustomerId(scope.customerId, scope.name, scope.birthdate)),
// );

const toDomain = (res: IReadOneCustomerResult) => new Customer(
  pipe(res.customer_id, CustomerId.create, E.getOrElse(e => { throw e })),
  pipe(res.name, String50.create, E.getOrElse(e => { throw e })),
  pipe(res.birthdate ? Birthdate.create(res.birthdate) : E.right(O.none), E.getOrElse(e => {
    throw e
  }))
);

type DbReadError = InvalidRecord | MissingRecord;

const _readOneCustomer = new PrepareQuery<IReadOneCustomerParams, IReadOneCustomerResult>
  (readOneCustomerIR);

const readOneCustomer = (dbConn: IDatabaseConnection) =>
  async (CustomerId: number): Promise<E.Either<DbReadError, Customer>> => {
    const records = await _readOneCustomer.run({ customerId }, dbConn);
    switch (records.length) {
      case 0:
        return Error.left(new MissingRecord(`Not found. CustomerId=${customerId}`));
      case 1:
        return pipe(records[0], toDomain, E.mapLeft(e => nwe InvalidRecord(e.message)));
      default:
        throw new DatabaseError(`Multiple records found for CustomerId=${customerId}`);
    }
  }

const convertSingleDbRecord = <T, U>(tableName: string, idValue: string, records: Array<T>,
  toDomain: (T) => Either<Error, U>) => {
  switch (records.length) {
    case 0: // none found
      return E.left(new MissingRecord(`Not found. Table=${tableName} Id=${idValue}`));
    case 1: // exactly one found
      return toDomain(records[0]);
    default: // more than one found?
      throw new DatabaseError(`Multiple records found for Table=${tableName} Id=${idValue}`);
  }
}

const readOneCustomer = (dbConn: IDatabaseConnection) =>
  async (customerId: number): Promise<E.Either<DbReadError, Custoemr>> => {
    const records = await _readOneCustomer.run({ customerId }, dbConn);

    return convertSingleDbRecord("Customer", customerId, records, toDomain(dbConn));
  }

