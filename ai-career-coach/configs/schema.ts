import { integer, pgTable, varchar ,json,timestamp} from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),

});

export const resumeAnalysisTable = pgTable("resume_analysis", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),

    userId: integer()
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),

    email: varchar({ length: 255 }).notNull(),

    analysisData: json(), // store Gemini response here

    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});