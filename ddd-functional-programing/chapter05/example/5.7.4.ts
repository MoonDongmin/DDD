import {produce} from "immer";

const initialPerson = new Person(new PersonId(42), "Joseph");

const updatedPerson = produce(initialPerson, draft => {
    draft.name = "Joe"
});

type UpdateName = (person: Person) => (name: string) => void;

type UpdateName = (person: Person) => (name: string) => Person;