import type { Entries } from "../types/types";
import type { DbProject, Project } from "../types/types";
import { createId } from "../../../lib/id";

export const fromDb = (project: DbProject): Project => {
  let tags: string[] = [];
  if (project.tags) {
    try {
      tags = JSON.parse(project.tags);
    } catch (e) {
      tags = project.tags.split(",").map(tag => tag.trim());
    }
  }
  return {
    Id: project.id,
    Title: project.title,
    Description: project.description,
    "Image Source": project.image_source,
    publishedAt: project.published_at ? new Date(project.published_at) : undefined,
    public: project.public === 1,
    status: project.status,
    tags: tags,
  };
};

export const createProject = (project: Partial<Project>): Project => {
  return {
    Id: project.Id ?? createId(),
    Title: project.Title ?? "",
    Description: project.Description ?? "",
    "Image Source": project["Image Source"] ?? "",
    publishedAt: project.publishedAt ?? new Date(),
    public: project.public ?? false,
    status: project.status ?? "draft",
    tags: project.tags ?? [],
  };
};

export const toDb = (data: Project): DbProject => {
  const project = createProject(data);
  const entries = Object.entries(project) as Entries<Project>;
  const dbProject = {} as DbProject;

  for (const entry of entries) {
    if (!entry) continue;
    const [key, value] = entry;
    switch (key) {
      case "Id":
        dbProject.id = value;
        break;
      case "Title":
        dbProject.title = value;
        break;
      case "Description":
        dbProject.description = value;
        break;
      case "Image Source":
        dbProject.image_source = value;
        break;
      case "publishedAt":
        dbProject.published_at = value?.toISOString() ?? null;
        break;
      case "public":
        dbProject.public = value ? 1 : 0;
        break;
      case "status":
        dbProject.status = value;
        break;
      case "tags":
        dbProject.tags = JSON.stringify(value || []);
        break;
      default:
        break;
    }
  }
  return dbProject;
};
