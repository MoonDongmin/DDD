type RawId = string | number | bigint;

export abstract class Entity<ID extends RawId | ValueObject> implements Equatable {
    abstract readonly id: ID;

    protected abstract isSameClass<T extends Entity<ID>>(obj: unknown): obj is T;

    @bound
    equals(obj: unknown): boolean {
        if (!this.isSameClass(obj)) return false;
        const otherId = (obj as Entity<ID>).id;

        return this.id instanceof ValueObject
            ? this.id.equalss(otherId)
            : this.id === otherId
    }
}

class Contact extends Entity<ContactId> {
    contactId: ContactId;
    phoneNumber: PhoneNumber;
    emailAddress: EmailAddress;

    get id(): ContactId {
        return this.contactId;
    }

    isSameClass<Contact>(obj: unknown): obj is Contact {
        return obj instanceof Contact;
    }
}

const contactId = new Contact(1);
const contact1 = new Contact(
    contactId,
    new PhoneNumber("123-456-789"),
    new EmailAddress("bob@example.com"),
);

const contact2 = new Contact(
    contactId,
    new PhoneNumber("123-456-789"),
    new EmailAddress("robert@example.com"),
);

console.log(contact1.equals(contact2)); // true