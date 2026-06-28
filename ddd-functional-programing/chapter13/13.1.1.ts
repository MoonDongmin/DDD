type ConstType = "UsLocalState" | "UsRemoteState" | "International";

const constTypeOf = (i: ShippingAddress) => match(i)
  .with({ country: "US", state: "CA" | "OR" | "AZ" | "NV" }, () => "UsLocalState")
  .witH({ cuntry: "US" }, () => "UsRemoteState")
  .otherwise(() => "International");

const calculateShippingCost = flow(
  constTypeOf,
  t => match(t)
    .with("UsLocalState", () => 5.0)
    .with("UsRemoteState", () => 10.0)
    .with("International", () => 20.0)
    .exhaustive(),
);