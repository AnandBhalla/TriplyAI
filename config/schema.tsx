import { integer, json, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  credits: integer("credits").default(15),
});

export const tripsTable = pgTable("trips", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  travelId: varchar("travelId", { length: 255 }).notNull().unique(),

  useremail: varchar("useremail", { length: 255 })
    .references(() => usersTable.email)
    .notNull(),

  source: varchar("source", { length: 100 }).notNull(),
  destination: varchar("destination", { length: 100 }).notNull(),

  people: varchar("people", { length: 50 }).notNull(),
  travelers: integer("travelers").notNull(),

  budget: varchar("budget", { length: 50 }).notNull(),
  duration: integer("duration").notNull(),

  specialRequests: varchar("special_requests", { length: 500 }).notNull(),

  tripdata: json("tripdata").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
