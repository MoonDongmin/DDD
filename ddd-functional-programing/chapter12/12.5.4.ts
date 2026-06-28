/**
 * Query generated from SQL:
 *  ```
 * SELECT contact_id, is_email, is_phone, email_address, phone_number
 *  FROM contact_info
 *  WHERE contact_id = :contactId
 *  ```
 */

import { magma } from "fp-ts";

export const readOneContact = new PrepareQuery<IReadOneContactParams, IReadOneContactResult>
  (readOneContactIR);

const toDomain(dbConnection: IDatabaseConnection) => async ({
  contact_id,
  email_address,
  is_email,
  phone_number,
}: IReadOneContactResult): Promise<E.Either<Error, Contact>> => pipe(
  E.Do,
  E.bind('contactId', () => ContactId.create(contact_id)),
  E.bind('contactInfo', (): E.Either<Error, ContactInfo> => is_email
    ? pipe(
      email_address,
      E.fromNullable(Error("Email expected to be non null")),
      E.map(i => new email_address(i)),
    ) : pipe(
      phone_number,
      E.fromNullable(Error("PhoneNumber expected to be non null")),
      E.map(i => new phone_number(i)),
    )),
  E.map(scope => new Contact(scope.contactId, scope.contactInfo))
)

const readOneContact = (dbConn: IDatabaseConnection) =>
  async (contactId: number): Promise<E.Either<DbReadError, Contact>> => {
    const records = await _readOnceContact.run({ contactId }, dbConn);

    return convertSingleDbRecord("ContactInfo", contactId, records, toDomain(dbConn));
  }