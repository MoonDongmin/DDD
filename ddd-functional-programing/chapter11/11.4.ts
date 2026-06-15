// 도메인에 정의된 타입들

import type { Either } from "fp-ts/lib/Either";

// null이 아니고 50자 이하로 제한된 문자열
class String50 {
  [String50]!: never;
  constructor(readonly value: string) {... }
}

// 1900년 1월 1일 이후이며 오늘 날짜보다 이전인 날짜로 제한된 타입
class Birthday {
  [birthday]!: never;
  constructor(readonly value: Date) {... }
}

// 도메인 타입
class Person {
  constructor(
    readonly first: String50,
    readonly last: String50,
    readonly birthdate: Birthdate,
  ) { }
}

// DTO 관련 타입과 함수를 모아두는 모듈
class PersonDto {
  constructor(
    readonly first: string,
    readonly last: string,
    readonly birthdate: Date,
  ) { }
}

// DTO 관련 타입과 함수를 모아두는 모듈
class PersonDto {
  constructor(
    readonly first: string,
    readonly last: string,
    readonly birthdate: Date,
  ) {

  }

  toDomain(): Either<ErrPrimitiveConstraints, Person> { }
  static fromDomain(person: Person): PersonDto { }
}

// DTO 관련 타입과 함수를 모아두는 모듈
class PersonDto {
  ...
  static fromDomain(person: Person): PersonDto {
    return new PersonDto(
      person.first.value,
      person.last.value,
      person.birthdate.value,
    );
  }
}

// DTO 관련 타입과 함수를 모아두는 모듈
class PersonDto {
  ...
  toDomain(): Either<ErrPrimitiveConstraints, Person> {
    return pipe(
      E.Do,
      E.bind('first', () => String50.create(this.firstName)),
      E.bind('last', () => String50.create(this.lastName)),
      E.bind('birthdate', () => Birthdate.create(this.birthdate)),
      E.map(scope => new Person(scope.first, scope.last, scope.birthdate)),
    );
  }
}

class String50 {
  [string50!]: never;
  constructor(readonly value: string) {
    super();
  }

  static create = (s: string): E.Either<ErrPrimitiveConstraints, String50> => {
    if (!s) {
      return Error.left(ErrEmptyString);
    }

    if (50 < s.length) {
      return E.left(new ErrStringTooLong(maxLen));
    }

    return E.right(new String50(s));
  }
}