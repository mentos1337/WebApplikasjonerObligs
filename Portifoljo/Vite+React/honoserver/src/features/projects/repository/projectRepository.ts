import { db, type DB } from "../../../db/db";
import type { Project, DbProject } from "../types/types";
import { fromDb, toDb } from "../mapper/projectMapper";
import type { Result } from "../types/types";
import { ResultHandler } from "../../../lib/result";

export const createProjectRepository = (db: DB) => {
  const exist = async (id: string): Promise<boolean> => {
    const query = db.prepare(
      "SELECT COUNT(*) as count FROM projects WHERE id = ?"
    );
    const data = query.get(id) as { count: number };
    return data.count > 0;
  };

  const getById = async (id: string): Promise<Result<Project>> => {
    try {
      const projectExists = await exist(id);
      if (!projectExists)
        return ResultHandler.failure("Project not found", "NOT_FOUND");
      const query = db.prepare("SELECT * FROM projects WHERE id = ?");
      const data = query.get(id) as DbProject;
      const project = fromDb(data);
      return ResultHandler.success(project);
    } catch (error) {
      console.error('Error in getById:', error);
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const list = async (): Promise<Result<Project[]>> => {
    try {
      const query = db.prepare("SELECT * FROM projects");
      const data = query.all() as DbProject[];
      const projects = data.map((project) => fromDb(project));
      return ResultHandler.success(projects);
    } catch (error) {
      console.error('Error in list:', error);
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const create = async (data: Project): Promise<Result<string>> => {
    try {
      const project = toDb(data);
      const query = db.prepare(`
        INSERT INTO projects (id, title, description, image_source, published_at, public, status, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      query.run(
        project.id,
        project.title,
        project.description,
        project.image_source,
        project.published_at,
        project.public,
        project.status,
        project.tags
      );
      return ResultHandler.success(project.id);
    } catch (error) {
      console.error('Error in create:', error);
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const update = async (data: Project): Promise<Result<Project>> => {
    try {
      const projectExists = await exist(data.Id);
      if (!projectExists) {
        const createResult = await create(data);
        if (!createResult.success) return createResult;
        return ResultHandler.success(data);
      }

      const project = toDb(data);

      const query = db.prepare(`
        UPDATE projects
        SET title = ?, description = ?, image_source = ?, published_at = ?, public = ?, status = ?, tags = ?
        WHERE id = ?
      `);

      query.run(
        project.title,
        project.description,
        project.image_source,
        project.published_at,
        project.public,
        project.status,
        project.tags,
        project.id
      );
      return ResultHandler.success(data);
    } catch (error) {
      console.error('Error in update:', error);
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const remove = async (id: string): Promise<Result<string>> => {
    try {
      const projectExists = await exist(id);
      if (!projectExists)
        return ResultHandler.failure("Project not found", "NOT_FOUND");
      const query = db.prepare("DELETE FROM projects WHERE id = ?");
      query.run(id);
      return ResultHandler.success(id);
    } catch (error) {
      console.error('Error in remove:', error);
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  return { create, list, getById, update, remove };
};

export const projectRepository = createProjectRepository(db);

export type ProjectRepository = ReturnType<typeof createProjectRepository>;
