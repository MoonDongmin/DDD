interface Equatable {
    equals(obj: unknown): boolean;
}

abstract class ValueObject implements Equatable {
    equals(obj: unknown): boolean {
        try {
            assert.deepStrictEqual(this.obj);
            return true;
        } catch {
            return false;
        }
    }
}

class Class1 extends ValueObject {
    constructor(readonly v1: number, readonly v2: string) {
        super();
    }
}

const obj1 = new Class1(1, "a");
const obj2 = new Class1(1, "a");

obj1.equals(obj2);