import {
    CountryCode,
    Email,
    Height,
    Name,
    Person,
    PersonId,
    PhoneNumber,
}              from "./person2.ts";
import {Color} from "./color.ts";

const dongMin = new Person(
    new PersonId(30217),
    new Name("Moon", "Dongmin"),
    PhoneNumber.parse("023745001"),
    PhoneNumber.parse("0873712503"),
    Email.parse("water_8760naver.com"),
    Height.fromMetric(180),
    CountryCode.parse("KO"),
);


let heightMetric = Height.metric(180);
let heightImperial = Height.imperial(5, 3);

let string1 = heightMetric.toString();
let string2 = heightImperial.toString();
let string3 = heightMetric.toImperial().toString();

let firstIsHigher = heightMetric > heightImperial;

let phone = PhoneNumber.parse("1234567");
let country = phone.country;
let phoneType = phone.phoneType;
let isValid = PhoneNumber.isValid("9876543");

let red = Color.fromRGB(255, 0, 0);
let green = Color.green;
let yellow = red.mixWith(green);
let yellowString = yellow.toString();
