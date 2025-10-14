import { database } from "../../core/database";
import { IMigration } from "../../core/dbMigrations";
import { insertPermissions, insertRolePermissions } from "../../uac/migrations/util";
import { donationsTable } from "./tables";

const db = database();

export const migrations:IMigration[] = [{
    name: "init-donation-products-plugin",
    module: "donation-products-plugin",
    description: "Initialize the donation products plugin",
    order: 0,
    down: () => db.schema
        .dropTableIfExists("donations")
        .alterTable("products", (t) => {
            t.dropColumn("isDonation");
        }),

    up: () => db.schema
        .createTable("donations", donationsTable)
        .alterTable("products", (t) => {
            t.boolean("isDonation").notNullable().defaultTo(false);
        }),
        
    initData: async () => {
        // Add permissions
        await insertPermissions(db, [
            { name: "donation.view", description: "View donations" },
            { name: "donation.create", description: "Create donations" },
            { name: "donation.update", description: "Update donations" },
            { name: "donation.delete", description: "Delete donations" },
        ]);
    },
}];
