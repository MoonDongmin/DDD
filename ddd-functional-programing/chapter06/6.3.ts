import type {NonEmptyArray} from "fp-ts/es6/NonEmptyArray";

class Order {
    readonly orderLines: NonEmptyArray<OrderLine>;
}