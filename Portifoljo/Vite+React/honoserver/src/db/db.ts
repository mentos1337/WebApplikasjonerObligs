import { makeLogger } from "../lib/logger";
import Database from "better-sqlite3";

const dbPath = "./database.db";

export const db = new Database(dbPath, {
  verbose: (message: unknown) => makeLogger().info(`${message}`),
});

export type DB = typeof db;

export default db;
