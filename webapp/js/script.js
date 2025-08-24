import express from "express";
import pkg from "pg";
const { Pool } = pkg;

const port = process.env.PORT || 3000;

// Prefer DATABASE_URL if present
const databaseUrl = process.env.DATABASE_URL;
const pool = databaseUrl
  ? new Pool({ connectionString: databaseUrl })
  : new Pool({
      host: process.env.PGHOST || "localhost",
      port: +(process.env.PGPORT || 5432),
      user: process.env.PGUSER || "appuser",
      password: process.env.PGPASSWORD || "appsecret",
      database: process.env.PGDATABASE || "appdb",
    });

const app = express();
app.use(express.json({ limit: "1mb" })); // <-- needed for JSON POST

// Ensure table exists
async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name    TEXT NOT NULL,
      email   TEXT NOT NULL,
      message TEXT,
      ts      TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
}
ensureTable().catch(err => {
  console.error("Failed to ensure table:", err);
  process.exit(1);
});

// Health
app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, db: "postgres", connected: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// POST /api/enquiry  -> insert a row
app.post("/api/enquiry", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }
    await pool.query(
      "INSERT INTO contacts (name, email, message) VALUES ($1,$2,$3)",
      [name, email, message || null]
    );
    return res.status(201).json({ ok: true });
  } catch (e) {
    console.error("enquiry error:", e);
    return res.status(500).json({ error: "failed to save enquiry" });
  }
});

// GET /api/contacts  -> return array (what your JS expects)
app.get("/api/contacts", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, name, email, message, ts FROM contacts ORDER BY id ASC"
    );
    return res.json(rows); // <-- array, not wrapped
  } catch (e) {
    console.error("contacts error:", e);
    return res.status(500).json({ error: "failed to load contacts" });
  }
});

app.listen(port, () => console.log(`Backend listening on ${port}`));
