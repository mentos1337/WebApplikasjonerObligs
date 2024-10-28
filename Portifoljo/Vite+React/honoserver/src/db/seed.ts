import fs from "node:fs/promises";
import { join } from "node:path";
import type { DB } from "./db";
import type { Project } from "../features/projects/types/types";

export const seed = async (db: DB) => {
  const path = join(import.meta.dirname, "data.json");
  const file = await fs.readFile(path, "utf-8");
  const { ProjectInformation } = JSON.parse(file) as { ProjectInformation: Project[] };

  const insertProject = db.prepare(`
    INSERT INTO projects (id, title, description, image_source, published_at, public, status, tags)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const checkProjectExists = db.prepare(`
    SELECT COUNT(*) as count FROM projects WHERE id = ?
  `);

  const seedProjects = db.transaction((projects: Project[]) => {
    for (const project of projects) {
      const exists = checkProjectExists.get(project.Id).count > 0;
      if (!exists) {
        insertProject.run(
          project.Id,
          project.Title,
          project.Description,
          project["Image Source"],
          typeof project.publishedAt === "string"
            ? project.publishedAt
            : project.publishedAt?.toISOString() ?? null,
          project.public ? 1 : 0,
          project.status,
          project.tags ? project.tags.join(",") : ""
        );
      }
    }
  });

  seedProjects(ProjectInformation);
};
