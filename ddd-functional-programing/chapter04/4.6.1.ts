type Option<A> = None | Some<A>;

class PersonName{
    readonly firstName: string;
    readonly middleInitial: Option<number>;
    readonly lastName: string;
}