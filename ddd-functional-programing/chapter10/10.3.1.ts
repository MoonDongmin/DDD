import {match} from "ts-pattern";

const flatMap = <T, E, U>(switchFn: (i: T) => E.Either<E, U>) =>
    (towTrackInput: E.Either<E, T>) =>
        match(towTrackInput)
            .with({_tag: 'Right'}, i => switchFn(i.right))
            .with({_tag: 'Left'}, i => i)
            .exhaustive();


const map = <T, E, U>(f: (i: T) => U) => (twoTrackInput: E.Either<E, T>) =>
    match(twoTrackInput)
        .with({_tag: 'Right'}, i => pipe(i.right, f, right))
        .with({_tag: 'Left'}, i => i)
        .exhaustive();