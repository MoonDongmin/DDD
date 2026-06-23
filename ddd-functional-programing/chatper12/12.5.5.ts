/**
 * Query generated from SQL:
 * ```
 * INSERT INTO contact_info (contact_id, is_email, is_phone, email_address, phone_number)
 * VALUES :contacts
 * ```
 */

export const insertContact = new PreparedQuery<IInsertContactParams, IInsertContactResult>
  (insertContactIR);


const toRawData = (contact: Contact) => {
  const contactId = contact.contactId.value;

  const { isEmail, isPhone, emailAddress, phoneNumber } = match(contact.info)
    .with(P.instanceOf(EmailAddress), emailAddress => ({
      isEmail: true,
      isPhone: false,
      emailAddress: emailAddress.value,
      phoneNumber: null,
    }))
    .with(P.instanceOf(PhoneNumber), phoneNumber => ({
      isEmail: false,
      isPhone: true,
      emailAddress: null,
      phoneNumber: phoneNumber.value,
    }))
    .exhaustive();

  return {
    contactId,
    isEmail,
    isPhone,
    emailAddress,
    phoneNumber,
  };
}

const writeContacts = (dbConn: IDatabaseConnection) => async (contacts: readonly Contact[]) =>
  insertContact.run({ contacts: contacts.map(toRawData) }, dbConn); // write to the DBs

