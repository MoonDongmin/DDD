class CustomerEmail {
    constructor(
        readonly emailAddress: EmailAddress,
        readonly isVerified: boolean
    ) {
    }
}

type CustomerEmail = EmailAddress | VerifiedEmailAddress;

// type SendPasswordResetEmail = (i: VerifiedEmailAddress) => ...;

class Contact {
    constructor(
        readonly name: Name,
        readonly contactInfo: ContactInfo
    ) {
    }
}

class BothContactMethods {
    constructor(
        readonly email: EmailContactInfo,
        readonly address: PostalContactInfo
    ) {
    }
}

type ContactInfo =
    | EmailContactInfo
    | PostalContactInfo
    | BothContactMethods;