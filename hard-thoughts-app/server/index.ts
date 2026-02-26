import express from "express";
import cors from "cors";
import { z } from "zod";
import { openDb, seedIfEmpty } from "./db.ts";
import type { AdminStats } from "./types.ts";

const PORT = Number(process.env.PORT ?? 8787);
const DB_PATH = process.env.DB_PATH ?? "./hardthoughts.sqlite";

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "2mb" }));

const db = openDb(DB_PATH);
seedIfEmpty(db);

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
}

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/admin/stats", (_req, res) => {
  const totalUsers = (db.prepare("SELECT COUNT(*) c FROM users").get() as any).c as number;
  const activeUsers = (db.prepare("SELECT COUNT(*) c FROM users WHERE status='active'").get() as any).c as number;
  const suspendedUsers = (db.prepare("SELECT COUNT(*) c FROM users WHERE status='suspended'").get() as any).c as number;
  const admins = (db.prepare("SELECT COUNT(*) c FROM users WHERE role='admin'").get() as any).c as number;
  const since = Date.now() - 1000*60*60*24*7;
  const searchesLast7d = (db.prepare("SELECT COUNT(*) c FROM search_events WHERE createdAt >= ?").get(since) as any).c as number;
  const invitesActive = (db.prepare("SELECT COUNT(*) c FROM invites WHERE expiresAt IS NULL OR expiresAt >= ?").get(Date.now()) as any).c as number;

  const stats: AdminStats = { totalUsers, activeUsers, suspendedUsers, admins, searchesLast7d, invitesActive };
  res.json(stats);
});

app.get("/api/admin/users", (req, res) => {
  const q = String(req.query.q ?? "").trim().toLowerCase();
  const role = String(req.query.role ?? "").trim();
  const status = String(req.query.status ?? "").trim();

  let sql = "SELECT * FROM users";
  const where: string[] = [];
  const params: any[] = [];

  if (q) {
    where.push("(LOWER(email) LIKE ? OR LOWER(displayName) LIKE ?)");
    params.push(`%${q}%`, `%${q}%`);
  }
  if (role === "user" || role === "admin") {
    where.push("role = ?");
    params.push(role);
  }
  if (status === "active" || status === "suspended") {
    where.push("status = ?");
    params.push(status);
  }
  if (where.length) sql += " WHERE " + where.join(" AND ");
  sql += " ORDER BY createdAt DESC";

  const rows = db.prepare(sql).all(...params);
  res.json(rows);
});

const PatchUserSchema = z.object({
  displayName: z.string().min(1).optional(),
  role: z.enum(["user","admin"]).optional(),
  status: z.enum(["active","suspended"]).optional(),
  adminNotes: z.string().max(5000).optional()
});

app.patch("/api/admin/users/:id", (req, res) => {
  const userId = req.params.id;
  const parsed = PatchUserSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const current = db.prepare("SELECT * FROM users WHERE id=?").get(userId);
  if (!current) return res.status(404).json({ error: "User not found" });

  const next = { ...current, ...parsed.data, lastActiveAt: current.lastActiveAt };
  db.prepare(`
    UPDATE users
    SET email=@email, displayName=@displayName, role=@role, status=@status, adminNotes=@adminNotes, createdAt=@createdAt, lastActiveAt=@lastActiveAt
    WHERE id=@id
  `).run(next);

  res.json(db.prepare("SELECT * FROM users WHERE id=?").get(userId));
});

app.delete("/api/admin/users/:id", (req, res) => {
  const userId = req.params.id;
  db.prepare("DELETE FROM users WHERE id=?").run(userId);
  res.json({ ok: true });
});

app.get("/api/admin/invites", (_req, res) => {
  const rows = db.prepare("SELECT * FROM invites ORDER BY createdAt DESC").all();
  res.json(rows);
});

const CreateInviteSchema = z.object({
  maxUses: z.number().int().min(1).max(1000).default(25),
  expiresAt: z.number().int().nullable().default(null)
});

app.post("/api/admin/invites", (req, res) => {
  const parsed = CreateInviteSchema.safeParse(req.body ?? {});
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const now = Date.now();
  const record = {
    id: id("inv"),
    code: `INV-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    maxUses: parsed.data.maxUses,
    uses: 0,
    createdAt: now,
    expiresAt: parsed.data.expiresAt,
    createdBy: "u_admin"
  };
  db.prepare(`
    INSERT INTO invites (id,code,maxUses,uses,createdAt,expiresAt,createdBy)
    VALUES (@id,@code,@maxUses,@uses,@createdAt,@expiresAt,@createdBy)
  `).run(record);

  res.json(record);
});

app.get("/api/admin/search-history", (req, res) => {
  const limit = Math.max(1, Math.min(500, Number(req.query.limit ?? 200)));
  const rows = db.prepare("SELECT * FROM search_events ORDER BY createdAt DESC LIMIT ?").all(limit);
  res.json(rows.map(r => ({ ...r, meta: JSON.parse(r.metaJson ?? "{}") })));
});

app.get("/api/admin/users/:id/search-history", (req, res) => {
  const userId = req.params.id;
  const limit = Math.max(1, Math.min(500, Number(req.query.limit ?? 200)));
  const rows = db.prepare("SELECT * FROM search_events WHERE userId=? ORDER BY createdAt DESC LIMIT ?").all(userId, limit);
  res.json(rows.map(r => ({ ...r, meta: JSON.parse(r.metaJson ?? "{}") })));
});

app.listen(PORT, () => {
  console.log(`HardThoughts server running on http://localhost:${PORT}`);
});
