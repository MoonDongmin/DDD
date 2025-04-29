class Person {
    private id: number;
    private firstName: string;
    private lastName: string;
    private landlinePhone: string;
    private mobilePhone: string;
    private email: string;
    private heightMetric: number;
    private countryCode: string;

    constructor(id: number, firstName: string, lastName: string, landlinePhone: string, mobilePhone: string, email: string, heightMetric: number, countryCode: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.landlinePhone = landlinePhone;
        this.mobilePhone = mobilePhone;
        this.email = email;
        this.heightMetric = heightMetric;
        this.countryCode = countryCode;
    }
}

const dongMin: Person = new Person(
    30217,
    "Moon",
    "Dongmin",
    "00100000",
    "00100000",
    "water_8760@naver.com",
    180,
    "KO",
);
