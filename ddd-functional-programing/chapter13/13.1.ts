import type { number } from "fp-ts";

// Caculate the shipping cost for an order
const calculateShippingCost = ({ shippingAddress }: ValidateOrder): number => {
  if (shippingAddress.country === "US") {
    switch (shippingAddress.state) {
      case "CA":
      case "OR":
      case "AZ":
      case "NV": // local
        return 5.0;
      default: // remote
        return 10.0;
    }
  } else {
    return 20.0; // shipping outside USA
  }
}