import { boolean } from "fp-ts";

const convertToPassthru =
  (checkProductCodeExists: (i: string) => boolean) =>
    (productCode: string): string => {
      if (!checkProductCodeExists(productCode)) throw "Invalid Product Code";
      return productCode;
    }

// const predicateToPassthru =
//   <T>(f: (i: T) => boolean) =>
//     (x: T): T => {
//       if (!f(x)) throw "Invalid Product Code";
//       return x;
//     }

const predicateToPassthru =
  <T>(errorMsg: string, f: (i: T) => boolean) =>
    (x: T): T => {
      if (!f(x)) throw errorMsg;
      return x;
    }

const toProductCode = (checkProductCodeExists: CheckProductCodeExists) => flow(
  toProductCode.create,
  predicateToPassthru(`Invalidate: ${productCode}`, checkProductCodeExists),
);