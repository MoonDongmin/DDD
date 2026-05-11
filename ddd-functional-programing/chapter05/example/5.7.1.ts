declare const contactId: unique symbol;

class ContactId{
    [contactId]!: never;
    constructor(readonly value: number){}
}

// class Contact{
//     constructor(
//         readonly contactId: ContactId,
//         readonly phoneNumber: ...,
//     readonly emailAddress: ...,
//     ){}
// }