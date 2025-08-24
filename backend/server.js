// backend/server.js
import express from "express";
import pkg from "pg";
const { Pool } = pkg;

const port = process.env.PORT || 3000;

// Prefer DATABASE_URL if present (works in PaaS/K8s)
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : new Pool({
      host: process.env.PGHOST || "localhost",
      port: +(process.env.PGPORT || 5432),
      user: process.env.PGUSER || "appuser",
      password: process.env.PGPASSWORD || "appsecret",
      database: process.env.PGDATABASE || "appdb",
    });

const app = express();
app.use(express.json({ limit: "1mb" })); // parse JSON bodies

// ----- bootstrap / migrations (idempotent) -----
async function ensureTables() {
  // Minimal shape first (works even if table exists from older schema)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id      SERIAL PRIMARY KEY,
      name    TEXT NOT NULL,
      email   TEXT NOT NULL,
      ts      TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  // Bring older tables up-to-date
  await pool.query(`ALTER TABLE contacts ADD COLUMN IF NOT EXISTS message TEXT`);

  // Demo table used by /api
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id  SERIAL PRIMARY KEY,
      msg TEXT NOT NULL,
      ts  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
}
await ensureTables().catch(err => {
  console.error("Failed to ensure tables:", err);
  process.exit(1);
});

// ----- routes -----

// Healthcheck
app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, db: "postgres", connected: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// Demo endpoint (writes to messages and returns count)
app.get("/api", async (_req, res) => {
  try {
    await pool.query("INSERT INTO messages (msg) VALUES ($1)", ["Hello from backend"]);
    const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM messages");
    res.json({ message: "Backend OK", count: rows[0].count });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Create enquiry (called by your form)
app.post("/api/enquiry", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }
    await pool.query(
      "INSERT INTO contacts (name, email, message) VALUES ($1,$2,$3)",
      [name, email, message ?? null]
    );
    res.status(201).json({ ok: true });
  } catch (e) {
    console.error("enquiry error:", e);
    res.status(500).json({ error: "failed to save enquiry" });
  }
});

// List contacts (your View button expects an array)
app.get("/api/contacts", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, name, email, message, ts FROM contacts ORDER BY id ASC"
    );
    res.json(rows); // return array
  } catch (e) {
    console.error("contacts error:", e);
    res.status(500).json({ error: "failed to load contacts" });
  }
});

// ----- server start -----
app.listen(port, () => console.log(`Backend listening on ${port}`));

// Graceful shutdown (optional)
process.on("SIGTERM", async () => {
  try { await pool.end(); } catch {}
  process.exit(0);
});
process.on("SIGINT", async () => {
  try { await pool.end(); } catch {}
  process.exit(0);
});
