import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"),
});

export const budgetItems = pgTable("budget_items", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  amount: integer("amount").notNull(),
  year: integer("year").notNull(),
  description: text("description").notNull(),
  quarter: integer("quarter"),  // New: track quarterly data
  region: text("region"),       // New: track regional data
  program: text("program"),     // New: track specific programs
  type: text("type"),          // New: expense type (operating/investment)
});

export const forumPosts = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const surveys = pgTable("surveys", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  questions: jsonb("questions").notNull(),
  active: boolean("active").notNull().default(true),
});

export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBudgetItemSchema = createInsertSchema(budgetItems);
export const insertForumPostSchema = createInsertSchema(forumPosts);
export const insertSurveySchema = createInsertSchema(surveys);
export const insertFeedbackSchema = createInsertSchema(feedback);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type BudgetItem = typeof budgetItems.$inferSelect;
export type ForumPost = typeof forumPosts.$inferSelect;
export type Survey = typeof surveys.$inferSelect;
export type Feedback = typeof feedback.$inferSelect;