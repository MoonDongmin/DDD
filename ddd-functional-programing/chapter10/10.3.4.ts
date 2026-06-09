export const mapLeft: <E, G>(f: (e: E) => G) => <A> (fa: Either<E, A>) => Either<G, A> =
    (f) => (fa) => isLeft(fa) ? left(f(fa.left)) : fa

type FunctionA = (i: Apple) => Either<AppleError, Bananas>;
type FunctionB = (i: Bananas) => Either<BananasError, Cherries>;

type FruitError = AppleError | BananaError;

const functionAWithFruitError = flow(
    functionA,
    E.mapLeft(e => new FruitError(e.message)),
)