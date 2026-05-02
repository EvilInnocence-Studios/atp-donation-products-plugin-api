import { init } from "../donation-products-plugin/migrations";

export { apiConfig } from "./endpoints";

export const migrations = [init];
export const setupMigrations = [init];
