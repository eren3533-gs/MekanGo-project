import { Router } from "express";
import { db } from "@workspace/db";
import { productsTable, businessesTable } from "@workspace/db";
import { getAuth } from "@clerk/express";
import { eq, desc } from "drizzle-orm";
import { CreateProductBody, UpdateProductBody, UpdateProductParams, DeleteProductParams } from "@workspace/api-zod";

const router = Router();

router.get("/businesses/:id/products", async (req, res): Promise<void> => {
  const id = parseInt(req.params.id);
  const products = await db.select().from(productsTable).where(eq(productsTable.businessId, id)).orderBy(desc(productsTable.createdAt));
  res.json(products.map((p) => ({ ...p, createdAt: p.createdAt?.toISOString() })));
});

router.get("/my/products", async (req, res): Promise<void> => {
  const auth = getAuth(req);
  if (!auth?.userId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const [business] = await db.select().from(businessesTable).where(eq(businessesTable.ownerId, auth.userId));
  if (!business) { res.json([]); return; }
  const products = await db.select().from(productsTable).where(eq(productsTable.businessId, business.id)).orderBy(desc(productsTable.createdAt));
  res.json(products.map((p) => ({ ...p, createdAt: p.createdAt?.toISOString() })));
});

router.post("/my/products", async (req, res): Promise<void> => {
  const auth = getAuth(req);
  if (!auth?.userId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const [business] = await db.select().from(businessesTable).where(eq(businessesTable.ownerId, auth.userId));
  if (!business) { res.status(404).json({ error: "Business not found" }); return; }
  const parsed = CreateProductBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.message }); return; }
  const [product] = await db.insert(productsTable).values({ businessId: business.id, ...parsed.data }).returning();
  res.status(201).json({ ...product, createdAt: product.createdAt?.toISOString() });
});

router.patch("/my/products/:id", async (req, res): Promise<void> => {
  const auth = getAuth(req);
  if (!auth?.userId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const parsed = UpdateProductParams.safeParse({ id: parseInt(req.params.id) });
  if (!parsed.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const [business] = await db.select().from(businessesTable).where(eq(businessesTable.ownerId, auth.userId));
  const [product] = await db.select().from(productsTable).where(eq(productsTable.id, parsed.data.id));
  if (!product || !business || product.businessId !== business.id) { res.status(403).json({ error: "Forbidden" }); return; }
  const bodyParsed = UpdateProductBody.safeParse(req.body);
  if (!bodyParsed.success) { res.status(400).json({ error: bodyParsed.error.message }); return; }
  const [updated] = await db.update(productsTable).set(bodyParsed.data).where(eq(productsTable.id, parsed.data.id)).returning();
  res.json({ ...updated, createdAt: updated.createdAt?.toISOString() });
});

router.delete("/my/products/:id", async (req, res): Promise<void> => {
  const auth = getAuth(req);
  if (!auth?.userId) { res.status(401).json({ error: "Unauthorized" }); return; }
  const parsed = DeleteProductParams.safeParse({ id: parseInt(req.params.id) });
  if (!parsed.success) { res.status(400).json({ error: "Invalid id" }); return; }
  const [business] = await db.select().from(businessesTable).where(eq(businessesTable.ownerId, auth.userId));
  const [product] = await db.select().from(productsTable).where(eq(productsTable.id, parsed.data.id));
  if (!product || !business || product.businessId !== business.id) { res.status(403).json({ error: "Forbidden" }); return; }
  await db.delete(productsTable).where(eq(productsTable.id, parsed.data.id));
  res.status(204).send();
});

export default router;
