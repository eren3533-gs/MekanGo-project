import { Router } from "express";
import { db } from "@workspace/db";
import { reviewsTable, businessesTable } from "@workspace/db";
import { getAuth } from "@clerk/express";
import { eq, avg, count, desc } from "drizzle-orm";
import { CreateReviewBody, CreateReviewParams } from "@workspace/api-zod";

const router = Router();

router.get("/businesses/:id/reviews", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  const reviews = await db.select().from(reviewsTable).where(eq(reviewsTable.businessId, id)).orderBy(desc(reviewsTable.createdAt));
  res.json(reviews.map((r) => ({ ...r, createdAt: r.createdAt?.toISOString() })));
});

router.post("/businesses/:id/reviews", async (req, res): Promise<void> => {
  const auth = getAuth(req);
  if (!auth?.userId) { res.status(401).json({ error: "Unauthorized" }); return; }

  const paramsParsed = CreateReviewParams.safeParse({ id: parseInt(req.params.id) });
  if (!paramsParsed.success) { res.status(400).json({ error: "Invalid id" }); return; }

  const parsed = CreateReviewBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }

  const businessId = paramsParsed.data.id;
  const [business] = await db.select().from(businessesTable).where(eq(businessesTable.id, businessId));
  if (!business) { res.status(404).json({ error: "Business not found" }); return; }

  const [review] = await db.insert(reviewsTable).values({
    businessId,
    userId: auth.userId,
    userName: "User",
    rating: parsed.data.rating,
    comment: parsed.data.comment ?? null,
  }).returning();

  const [stats] = await db
    .select({ avg: avg(reviewsTable.rating), count: count() })
    .from(reviewsTable)
    .where(eq(reviewsTable.businessId, businessId));

  await db.update(businessesTable).set({
    rating: parseFloat(stats.avg ?? "0"),
    reviewCount: stats.count,
  }).where(eq(businessesTable.id, businessId));

  res.status(201).json({ ...review, createdAt: review.createdAt?.toISOString() });
});

export default router;
