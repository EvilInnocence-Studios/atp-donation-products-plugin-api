import { FieldRegistry } from "@core/express/util";
import { init } from "../donation-products-plugin/migrations";

export { apiConfig } from "./endpoints";

export const migrations = [init];
export const setupMigrations = [init];

FieldRegistry.register("donations", ["amount", "productId", "orderId", "transactionId", "status", "note"]);
FieldRegistry.register("products", ["isDonation", "isSetYourOwnAmount"]);
