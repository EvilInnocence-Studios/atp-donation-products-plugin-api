import { Knex } from "knex";

export const donationsTable = (t:Knex.CreateTableBuilder) => {
    t.bigIncrements();
    t.bigInteger("userId").unsigned().notNullable().references("users.id").onDelete("CASCADE");
    t.decimal("amount", 10, 2).notNullable().defaultTo(0.00);
    t.bigInteger("productId").unsigned().notNullable().references("products.id").onDelete("CASCADE");
    t.bigInteger("orderId").unsigned().references("orders.id").onDelete("SET NULL");
    t.timestamp("createdAt");
    t.enum("status", ["pending", "completed"]).notNullable().defaultTo("pending");
    t.string("transactionId", 255).notNullable().unique();
    t.text("note");
}