// Either 타입 정의
import type {Left, Right} from "fp-ts/es6/Either";

type Either<Failure, Success> =
    | Right<Success>
    | Left<Failure>

type Left<T> = {
    _tag: 'Left',
    left: T
};

type Right<T> = {
    _tag: 'Right',
    left: T
};

// Either를 위한 함수들
const flatMap = <T, E, U>(switchFn: (i: T) => E.Either<E, U> => (twoTrackInput: E.Either<E,
    T>)=> ... )

const map = <T, E, U>(f: (i: T) => U)=> (twoTrackInput: E.Either<E,T>)
