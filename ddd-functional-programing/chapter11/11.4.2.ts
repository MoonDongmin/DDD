import { log } from "fp-ts/lib/Console";

// Person을 JSON 문자열로 직렬화
const jsonFromPerson = flow(
  Dto.Person.fromDomain,
  json.serialize,
);

// 테스트 입력
const person = new Domain.Person(
  new String50('Alex'),
  new String50('Adams'),
  new Birthdate(new Date(1980, 1, 1)),
);

// 직렬화 파이프라인 사용
console.log(jsonFromPerson(person));

// 출력 결과
// "{"First": "Alex", "Last": "Adams", "Birthdate": "1980-01-01T00:00:00.000Z"}"

type DtoError = ValidationErro | DeserializationError;

// JSON 문자열을 Person으로 역직렬화
const jsonToDomain = (jsonString: JsonString): Either<DtoError, Domain.Person> => pipe(
  E.Do,
  E.bind('deserializedValue', () => pipe(
    jsonString,
    json.deserialize,
    E.mapLeft(DeserializationError.from),
  )),
  E.flatMap(({ deserializedValue }) => pipe(
    deserializedValue,
    Dto.Person.toDomain,
    E.mapLeft(ValidationError.from),
  )),
)

// JSON string to test with
const jsonPerson = `{
"first": "Alex",
"last": "Adams",
"birthdate": "1980-01-01T00:00:00.000Z"
}`; 

// call the deserializtion pipeline
console.log(jsonToPerson(jsonPerson));

const jsonPersonWithErrors = `{
"first: "",
"last": "Adams",
"birthdate": "1776-01-01T00:00:00.000Z"
}`;

console.log(jsonToPerson(jsonPersonWithErrors));




