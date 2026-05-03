import { Router } from "express";
import { db } from "@workspace/db";
import { subscriptionPlansTable, subscriptionsTable } from "@workspace/db";
import { getAuth } from "@clerk/express";
import { eq, desc } from "drizzle-orm";
import { SubscribeBody } from "@workspace/api-zod";

const router = Router();

router.get("/subscriptions/plans", async (req, res): Promise<void> => {
  const plans = await db.select().from(subscriptionPlansTable).orderBy(subscriptionPlansTable.priceMonthly);
  res.json(plans);
});

router.get("/subscriptions/my", async (req, res): Promise<void> => {
  const auth = getAuth(req);
  if (!auth?.userId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const [subscription] = await db
    .select({
      id: subscriptionsTable.id,
      userId: subscriptionsTable.userId,
      planId: subscriptionsTable.planId,
      planName: subscriptionPlansTable.name,
      tier: subscriptionPlansTable.tier,
      status: subscriptionsTable.status,
      startDate: subscriptionsTable.startDate,
      endDate: subscriptionsTable.endDate,
      createdAt: subscriptionsTable.createdAt,
    })
    .from(subscriptionsTable)
    .leftJoin(subscriptionPlansTable, eq(subscriptionsTable.planId, subscriptionPlansTable.id))
    .where(eq(subscriptionsTable.userId, auth.userId))
    .orderBy(desc(subscriptionsTable.createdAt));

  if (!subscription) { res.status(404).json({ error: "No subscription" }); return; }
  res.json({ ...subscription, planName: subscription.planName ?? "", tier: subscription.tier ?? "", createdAt: subscription.createdAt?.toISOString() });
});

router.post("/subscriptions/subscribe", async (req, res): Promise<void> => {
  const auth = getAuth(req);
  if (!auth?.userId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const parsed = SubscribeBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [plan] = await db.select().from(subscriptionPlansTable).where(eq(subscriptionPlansTable.id, parsed.data.planId));
  if (!plan) { res.status(404).json({ error: "Plan not found" }); return; }
  const startDate = new Date().toISOString().split("T")[0];
  const [subscription] = await db.insert(subscriptionsTable).values({
    userId: auth.userId,
    planId: parsed.data.planId,
    status: "active",
    startDate,
  }).returning();
  res.status(201).json({
    ...subscription,
    planName: plan.name,
    tier: plan.tier,
    createdAt: subscription.createdAt?.toISOString(),
  });
});

export default router;
