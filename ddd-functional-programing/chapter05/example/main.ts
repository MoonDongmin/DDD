import {CustomerId} from "./customer-id.ts";
import {OrderId} from "./order-id.ts";

const customerId = new CustomerId(42);

// const temp: CustomerId = new OrderId(42);

const {value} = new OrderId(42);