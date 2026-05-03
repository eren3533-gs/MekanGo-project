import { pgTable, serial, text, integer, real, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { categoriesTable } from "./categories";

export const businessesTable = pgTable("businesses", {
  id: serial("id").primaryKey(),
  ownerId: text("owner_id").notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  categoryId: integer("category_id").notNull().references(() => categoriesTable.id),
  description: text("description"),
  shortDescription: text("short_description"),
  address: text("address"),
  city: text("city").notNull(),
  phone: text("phone"),
  email: text("email"),
  website: text("website"),
  coverImage: text("cover_image"),
  logoImage: text("logo_image"),
  workingHours: text("working_hours"),
  socialLinks: jsonb("social_links"),
  rating: real("rating").notNull().default(0),
  reviewCount: integer("review_count").notNull().default(0),
  subscriptionTier: text("subscription_tier"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertBusinessSchema = createInsertSchema(businessesTable).omit({ id: true, createdAt: true, rating: true, reviewCount: true });
export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
export type Business = typeof businessesTable.$inferSelect;
