import { Router } from "express";
import { db } from "@workspace/db";
import { campaignsTable, businessesTable } from "@workspace/db";
import { getAuth } from "@clerk/express";
import { eq, and, gte, desc } from "drizzle-orm";
import { CreateCampaignBody, UpdateCampaignBody, ListCampaignsQueryParams, DeleteCampaignParams, UpdateCampaignParams } from "@workspace/api-zod";

const router = Router();

router.get("/campaigns", async (req, res): Promise<void> => {
  const parsed = ListCampaignsQueryParams.safeParse(req.query);
  const params = parsed.success ? parsed.data : {};
  const limit = params.limit ?? 20;
  const offset = params.offset ?? 0;
  const now = new Date().toISOString().split("T")[0];

  const campaigns = await db
    .select({
      id: campaignsTable.id,
      businessId: campaignsTable.businessId,
      title: campaignsTable.title,
      description: campaignsTable.description,
      discountPercent: campaignsTable.discountPercent,
      startDate: campaignsTable.startDate,
      endDate: campaignsTable.endDate,
      isActive: campaignsTable.isActive,
      createdAt: campaignsTable.createdAt,
      businessName: businessesTable.name,
      businessCity: businessesTable.city,
      businessLogoImage: businessesTable.logoImage,
    })
    .from(campaignsTable)
    .leftJoin(businessesTable, eq(campaignsTable.businessId, businessesTable.id))
    .where(and(eq(campaignsTable.isActive, true), gte(campaignsTable.endDate, now)))
    .orderBy(desc(campaignsTable.discountPercent))
    .limit(limit)
    .offset(offset);

  res.json(campaigns.map((c) => ({ ...c, createdAt: c.createdAt?.toISOString() ?? new Date().toISOString() })));
});

router.get("/businesses/:id/campaigns", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  const campaigns = await db.select().from(campaignsTable).where(eq(campaignsTable.businessId, id)).orderBy(desc(campaignsTable.createdAt));
  res.json(campaigns.map((c) => ({ ...c, createdAt: c.createdAt?.toISOString() ?? new Date().toISOString() })));
});

router.get("/my/campaigns", async (req, res): Promise<void> => {
  const auth = getAuth(req);
  if (!auth?.userId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const [business] = await db.select().from(businessesTable).where(eq(businessesTable.ownerId, auth.userId));
  if (!business) { res.json([]); return; }
  const campaigns = await db.select().from(campaignsTable).where(eq(campaignsTable.businessId, business.id)).orderBy(desc(campaignsTable.createdAt));
  res.json(campaigns.map((c) => ({ ...c, createdAt: c.createdAt?.toISOString() ?? new Date().toISOString() })));
});

router.post("/my/campaigns", async (req, res): Promise<void> => {
  const auth = getAuth(req);
  if (!auth?.userId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const [business] = await db.select().from(businessesTable).where(eq(businessesTable.ownerId, auth.userId));
  if (!business) { res.status(404).json({ error: "Business not found" }); return; }
  const parsed = CreateCampaignBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [campaign] = await db.insert(campaignsTable).values({ businessId: business.id, ...parsed.data, isActive: true }).returning();
  res.status(201).json({ ...campaign, createdAt: campaign.createdAt?.toISOString() });
});

router.patch("/my/campaigns/:id", async (req, res): Promise<void> => {
  const auth = getAuth(req);
  if (!auth?.userId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const parsed = UpdateCampaignParams.safeParse({ id: parseInt(req.params.id) });
  if (!parsed.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const [business] = await db.select().from(businessesTable).where(eq(businessesTable.ownerId, auth.userId));
  const [campaign] = await db.select().from(campaignsTable).where(eq(campaignsTable.id, parsed.data.id));
  if (!campaign || !business || campaign.businessId !== business.id) { res.status(403).json({ error: "Forbidden" }); return; }
  const bodyParsed = UpdateCampaignBody.safeParse(req.body);
  if (!bodyParsed.success) { res.status(400).json({ error: bodyParsed.error.message }); return; }
  const [updated] = await db.update(campaignsTable).set(bodyParsed.data).where(eq(campaignsTable.id, parsed.data.id)).returning();
  res.json({ ...updated, createdAt: updated.createdAt?.toISOString() });
});

router.delete("/my/campaigns/:id", async (req, res): Promise<void> => {
  const auth = getAuth(req);
  if (!auth?.userId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const parsed = DeleteCampaignParams.safeParse({ id: parseInt(req.params.id) });
  if (!parsed.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const [business] = await db.select().from(businessesTable).where(eq(businessesTable.ownerId, auth.userId));
  const [campaign] = await db.select().from(campaignsTable).where(eq(campaignsTable.id, parsed.data.id));
  if (!campaign || !business || campaign.businessId !== business.id) { res.status(403).json({ error: "Forbidden" }); return; }
  await db.delete(campaignsTable).where(eq(campaignsTable.id, parsed.data.id));
  res.status(204).send();
});

export default router;
