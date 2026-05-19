import { FieldRegistry } from "@core/express/util";
import { init } from "../donation-products-plugin/migrations";

export { apiConfig } from "./endpoints";

export const migrations = [init];
export const setupMigrations = [init];

FieldRegistry.register("donations", {
    create: ["userId", "amount", "productId", "orderId", "createdAt","transactionId", "status", "note"],
    update: ["transactionId", "status", "note"],
});
FieldRegistry.register("products", {
    create: ["isDonation", "isSetYourOwnAmount"],
    update: ["isDonation", "isSetYourOwnAmount"],
);
