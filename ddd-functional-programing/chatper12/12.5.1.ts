declare const contactId: unique symbol;
class ContactId {
  [contactId]!: never;
  constructor(readonly value: number) {

  }
  ...
}

declare const emailAddress: unique symbol;
class EmailAddress implements Wrapper<string, typeof emailAddress> {
  [emailAddress]!: never;
  constructor(readonly value: string) {

  }
  ...
}

declare const phoneNumber: unique symbol;
class PhoneNumber implements Wrapper<string, typeof phoneNumber> {
  [phoneNumber]!: never;
  constructor(readonly value: string) {

  }
  ...
}

type ContactInfo = EmailAddress | PhoneNumber;

class Contact {
  constructor(
    readonly contactId: ContactId,
    readonly info: ContactInfo
  ) {

  }
  ...
}