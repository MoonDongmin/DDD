import type { Either } from "fp-ts/lib/Either";
import { last } from "fp-ts/lib/ReadonlyNonEmptyArray";

// 도메인 타입 
class Name {
  constructor(
    readonly first: String50,
    readonly last: String50,
  ) { }
}

class A {

}

class B {
  constructor(
    readonly value: number,
  ) { }
}

class C {
  constructor(
    readonly value: number,
  ) { }
}

class D {
  constructor(
    readonly value: number,
  ) { }
}

type Example = A | B | C | D;

class NameDto {
  constructor(
    readonly first: string,
    readonly last: string,
  ) { }
}

class ExampleDto {
  ...
  readonly tag: "A" | "B" | "C" | "D";
  // A 케이스에는 데이터가 없음
  readonly bData: number | null = null, // B 케이스의 데이터
  readonly cData: string[] = [], // C 케이스의 데이터
  readonly dData: NameDto | null = null // D 케이스의 데이터
  ...
}

class NameDto {
  ...
  static fromDomain({ first, last }: Name): NameDto {
    return new NameDto(first.value, last.value);
  }
}

class ExampleDto {
  constructor(
    tag: "A" | "B" | "C" | "D",
    // A 케이스에는 데이터가 없음
    bData: number | null = null, // B 케이스의 데이터
    cData: string[] = [], // C 케이스의 데이터
    dData: NameDto | null = null // D 케이스의 데이터
  ) { }

  static fromDomain(domainObj: Example): ExampleDto {
    return match(domainObj)
      .with(P.instanceOf(A), () => new ExampleDto("A", null, [], null))
      .with(P.instanceOf(B), ({ value }) => new ExampleDto("A", value, [], null))
      .with(P.instanceOf(C), ({ value }) => new ExampleDto("A", null, value, null))
      .with(P.instanceOf(D), ({ value }) => new ExampleDto("A", null, [], NameDto.fromDomain(value)))
      .exhaustive();
  }
}


class NameDto {
  ...
  toDomain(): Either<ErrPrimitiveConstraints, Name> {
    return pipe(
      E.Do,
      E.bind('first', () => String50.create(i.first)),
      E.bind('last', () => String50.create(i.last)),
      E.map(({ first, last }) => new Name(first, last)),
    );
  }
}

class ExampleDto {
  ...
  toDomain(): Either<ErrPrimitiveConstraints, Example> {
    return match(dto)
      .with({ tag: "A" }. () => E.right(new A()))
      .with({ tag: "B" }, ({ bData }) => bData
        ? E.right(new B(bData))
        : E.left(Error("C data not expected to be null"))
      )
      .with({ tag: "D" }, ({ dData }) => dData
        ? dData.toDomain()
        : E.left(Error("D data not expected to be null"))
          .otherwise(({ tag }) => E.left(`Tag ${tag} not recognized`)));
  }
}

