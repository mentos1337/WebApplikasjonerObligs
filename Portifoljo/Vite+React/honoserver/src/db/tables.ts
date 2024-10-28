import type { DB } from "./db";

export const createTables = async (db: DB) => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      image_source TEXT,
      published_at TEXT,
      public INTEGER NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('draft', 'published')),
      tags TEXT NOT NULL
    );
  `);

  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
    CREATE INDEX IF NOT EXISTS idx_projects_public ON projects(public);
  `);
};