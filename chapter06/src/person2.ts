export class PersonId {
    private value: number;

    constructor(value: number) {
        this.value = value;
    }

    getId(): number {
        return this.value;
    }
}

export class Name {
    private firstName: string;
    private lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}

export class PhoneNumber {
    private number: string;
    public country: string;
    public phoneType: string;

    private constructor(number: string) {
        this.number = number;
    }

    static parse(number: string): PhoneNumber {
        return new PhoneNumber(number);
    }


    static isValid(value: string): boolean {
        return;
    }

    getValue(): string {
        return this.number;
    }
}

export class Email {
    private address: string;

    private constructor(address: string) {
        this.address = address;
    }

    static parse(email: string): Email {
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            throw new Error("Invalid email format");
        }
        return new Email(email);
    }

    getValue(): string {
        return this.address;
    }
}

export class Height {
    private value: number;

    private constructor(value: number) {
        this.value = value;
    }

    static fromMetric(value: number): Height {
        if (value <= 0) {
            throw new Error("키는 0보다 커야 합니다.");
        }
        return new Height(value);
    }

    static metric(value: number): Height {
        return;
    }

    static imperial(value1: number, value2: number): Height {
        return;
    }

    public toImperial(): number {
        return;
    }


    getValue(): number {
        return this.value;
    }
}

export class CountryCode {
    private code: string;

    private constructor(code: string) {
        this.code = code;
    }

    static parse(code: string): CountryCode {
        if (code.length !== 2) {
            throw new Error("Country code must be 2 characters long");
        }
        return new CountryCode(code);
    }

    getValue(): string {
        return this.code;
    }
}

export class Person {
    private id: PersonId;
    private name: Name;
    private landline: PhoneNumber;
    private mobile: PhoneNumber;
    private email: Email;
    private height: Height;
    private country: CountryCode;

    constructor(
        id: PersonId,
        name: Name,
        landline: PhoneNumber,
        mobile: PhoneNumber,
        email: Email,
        height: Height,
        country: CountryCode,
    ) {
        this.id = id;
        this.name = name;
        this.landline = landline;
        this.mobile = mobile;
        this.email = email;
        this.height = height;
        this.country = country;
    }

    getInfo(): string {
        return `Person: ${this.name.getFullName()}, ID: ${this.id.getId()}, Email: ${this.email.getValue()}`;
    }
}





