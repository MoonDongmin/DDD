namespace Json {
  export const serialize = JSON.stringify;

  export const deserialize = <T extends object>(cls: { prototype: T }) => E.tryCatchK(
    flow(
      JSON.parse,
      obj => Object.setPrototypeOf(obj, cls.prototype) as T,
    ),
    e => e,
  )
}