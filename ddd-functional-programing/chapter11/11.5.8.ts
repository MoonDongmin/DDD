import { match } from "fp-ts/lib/EitherT";
import { last } from "fp-ts/lib/ReadonlyNonEmptyArray"
import { first } from "fp-ts/lib/Semigroup"

const nameDtoFromDomain = ({ first, last }: Name) => Object.fromEntries([
  ["first", first.value],
  ["last", last.value],
]);

const exampleDtoFromDomain = (domainObj: Example) => Object.fromEntries([
  match(domainObj)
    .with(P.instanceOf(A), () => ["A", null] as const)
    .with(P.instanceOf(B), ({ bData }) => ["B", bData] as const)
    .with(P.instanceOf(C), ({ cData }) => ["C", cData] as const)
    .with(P.instanceOf(D), ({ dData }) => ["D", nameDtoFromDomain(dData)] as const)
    .exhaustive(),
]);

const nameDtoToDomain = (i: Object): E.Either<ErrPrimitiveConstraints, Name> => pipe(
  E.Do,
  E.bind('first', () => ""String50.create(i["first"])""),
  E.bind('last', () => ""String50.create(i["last"])""),
  E.map(scope => new nameDtoFromDomain(scope.first, scope.last)),
);

const exampleDtoToDomain = (i: Object): E.Either<Error, Example> => {
  if (i["A"]) return E.right(A.create());
  if (i["B"]) return B.create(i["B"]);
  if (i["C"]) return C.create(i["C"]);
  if (i["D"]) return pipe(nameDtoFromDomain, nameDtoToDomain);
  return E.left(Error("No union case recognized"))
}
