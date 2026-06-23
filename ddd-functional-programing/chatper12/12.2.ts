// type InsertData = (d: Data) => (s: DataStoreState) => NewDataStoreState;
// type ReadData = (q: Query) => (s: DataStoreState) => Data;
// type UpdateData = (d: Data) => (s: DataStoreState) => NewDataStoreState;
// type DeleteData = (k: Key) => (s: DataStoreState) => NewDataStoreState;

import type { TaskEither } from "fp-ts/lib/TaskEither";

// type InsertData = (i: DbConnection) => (j: Data) => Unit;
// type ReadData = (i: DbConnection) => (j: Query) => Data;
// type UpdateData = (i: DbConnection) => (j: Data) => Unit;
// type DeleteData = (i: DbConnection) => (j: Key) => Unit;


type DbError = ...
type DbResult<T> = TaskEither<DbError, T>;

type InsertData = (i: Data) => DbResult<Unit>;
type ReadData = (i: Query) => DbResult<Data>;
type UpdateData = (i: Data) => DbResult<Unit>;
type DeleteData = (i: Key) => DbResult<Unit>;


