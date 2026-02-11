import { database } from "../../core/database";
import { IMigration } from "../../core/dbMigrations";
import { insertPermissions, insertRolePermissions } from "../../uac/migrations/util";
import { donationsTable } from "./tables";

const db = database();

export const init: IMigration = {
    name: "init",
    module: "donation-products-plugin",
    description: "Initialize the donation products plugin",
    order: 3,
    down: () => db.schema
        .dropTableIfExists("donations")
        .alterTable("products", (t) => {
            t.dropColumn("isDonation");
            t.dropColumn("isSetYourOwnAmount");
        }),

    up: () => db.schema
        .createTable("donations", donationsTable)
        .alterTable("products", (t) => {
            t.boolean("isDonation").notNullable().defaultTo(false);
            t.boolean("isSetYourOwnAmount").notNullable().defaultTo(false);
        }),
        
    initData: async () => {
        // Add permissions
        await insertPermissions(db, [
            { name: "donation.view", description: "View donations" },
            { name: "donation.create", description: "Create donations" },
            { name: "donation.update", description: "Update donations" },
            { name: "donation.delete", description: "Delete donations" },
        ]);
        await insertRolePermissions(db, [
            {roleName: "SuperUser", permissionName: "donation.view"},
            {roleName: "SuperUser", permissionName: "donation.create"},
            {roleName: "SuperUser", permissionName: "donation.update"},
            {roleName: "SuperUser", permissionName: "donation.delete"},
            {roleName: "Customer", permissionName: "donation.view"},
            {roleName: "Customer", permissionName: "donation.create"},
            {roleName: "Customer", permissionName: "donation.update"},
        ]);
    },
};

export const migrations:IMigration[] = [init];

