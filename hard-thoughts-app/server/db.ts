import Database from "better-sqlite3";

export function openDb(dbPath = "./hardthoughts.sqlite") {
  const db = new Database(dbPath);

  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      displayName TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('user','admin')),
      status TEXT NOT NULL CHECK(status IN ('active','suspended')),
      adminNotes TEXT NOT NULL DEFAULT '',
      createdAt INTEGER NOT NULL,
      lastActiveAt INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS invites (
      id TEXT PRIMARY KEY,
      code TEXT NOT NULL UNIQUE,
      maxUses INTEGER NOT NULL,
      uses INTEGER NOT NULL DEFAULT 0,
      createdAt INTEGER NOT NULL,
      expiresAt INTEGER,
      createdBy TEXT
    );

    CREATE TABLE IF NOT EXISTS search_events (
      id TEXT PRIMARY KEY,
      userId TEXT,
      query TEXT NOT NULL,
      createdAt INTEGER NOT NULL,
      metaJson TEXT NOT NULL DEFAULT '{}',
      FOREIGN KEY(userId) REFERENCES users(id) ON DELETE SET NULL
    );
  `);

  return db;
}

export function seedIfEmpty(db: Database.Database) {
  const row = db.prepare("SELECT COUNT(*) AS c FROM users").get() as { c: number };
  if (row.c > 0) return;

  const now = Date.now();
  const insert = db.prepare(`
    INSERT INTO users (id,email,displayName,role,status,adminNotes,createdAt,lastActiveAt)
    VALUES (@id,@email,@displayName,@role,@status,@adminNotes,@createdAt,@lastActiveAt)
  `);

  insert.run({
    id: "u_admin",
    email: "admin@hardthoughts.local",
    displayName: "Admin",
    role: "admin",
    status: "active",
    adminNotes: "Default seed admin",
    createdAt: now - 1000*60*60*24*30,
    lastActiveAt: now
  });

  for (let i=1;i<=12;i++){
    insert.run({
      id: `u_${i}`,
      email: `user${i}@example.com`,
      displayName: `User ${i}`,
      role: "user",
      status: i%7===0 ? "suspended" : "active",
      adminNotes: "",
      createdAt: now - 1000*60*60*24*(40-i),
      lastActiveAt: now - 1000*60*60*12*i
    });
  }

  const inv = db.prepare(`
    INSERT INTO invites (id,code,maxUses,uses,createdAt,expiresAt,createdBy)
    VALUES (@id,@code,@maxUses,@uses,@createdAt,@expiresAt,@createdBy)
  `);
  inv.run({ id:"inv_1", code:"WELCOME-1", maxUses:25, uses:3, createdAt: now-1000*60*60*24*3, expiresAt:null, createdBy:"u_admin" });

  const se = db.prepare(`
    INSERT INTO search_events (id,userId,query,createdAt,metaJson)
    VALUES (@id,@userId,@query,@createdAt,@metaJson)
  `);
  for (let i=1;i<=50;i++){
    se.run({
      id:`s_${i}`,
      userId: i%5===0 ? null : `u_${(i%12)+1}`,
      query: ["stoicism","cosmic horror","space opera","love","betrayal","robots","myth"][i%7],
      createdAt: now - 1000*60*60*(i%48),
      metaJson: JSON.stringify({ source: "seed", idx: i })
    });
  }
}
