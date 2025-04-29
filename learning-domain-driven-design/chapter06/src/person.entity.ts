import {
    Name,
    PersonId,
} from "./person2.ts";

class Person {
    public _name: Name;
    public id: PersonId;


    constructor(name: Name, id: PersonId) {
        this.id = id;
        this._name = name;
    }

    get name(): Name {
        return this._name;
    }

    set name(value: Name) {
        this._name = value;
    }

}
