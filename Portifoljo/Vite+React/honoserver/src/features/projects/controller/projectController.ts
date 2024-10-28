import { Hono } from "hono";
import type { ProjectService } from "../service/projectService";
import { errorResponse } from "../../../lib/error";
import type { Project } from "../types/types";
import { cors } from "hono/cors";

export const projectController = (projectService: ProjectService) => {
  const app = new Hono();

  app.use("*", cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  }));

  app.get("/", async (c) => {
    try {
      const projectsResult = await projectService.list();
      if (!projectsResult.success) {
        return errorResponse(c, "INTERNAL_SERVER_ERROR", "Error retrieving projects");
      }
      return c.json(projectsResult.data);
    } catch (error) {
      console.error('Error in GET / handler:', error);
      return errorResponse(c, "INTERNAL_SERVER_ERROR", "Error retrieving projects");
    }
  });

  app.get("/:id", async (c) => {
    try {
      const projectId = c.req.param("id");
      const projectResult = await projectService.getById(projectId);
      if (!projectResult.success) return errorResponse(c, "NOT_FOUND", "Project not found");
      return c.json(projectResult.data);
    } catch (error) {
      console.error('Error in GET /:id handler:', error);
      return errorResponse(c, "INTERNAL_SERVER_ERROR", "Error retrieving project");
    }
  });

  app.post("/", async (c) => {
    try {
      const newProject: Project = await c.req.json();
      const createdProject = await projectService.create(newProject);

      if (!createdProject.success) {
        return errorResponse(c, createdProject.error.code, createdProject.error.message);
      }

      return c.json(createdProject.data, 201);
    } catch (error) {
      console.error('Error in POST / handler:', error);
      return errorResponse(c, "INTERNAL_SERVER_ERROR", "Error adding project");
    }
  });

  app.put("/:id", async (c) => {
    try {
      const projectId = c.req.param("id");
      const projectUpdates = await c.req.json();

      const existingProjectResult = await projectService.getById(projectId);
      const existingProject = existingProjectResult.success ? existingProjectResult.data : null;

      const updatedProject: Project = {
        Id: projectId,
        Title: projectUpdates.Title ?? existingProject?.Title ?? "",
        Description: projectUpdates.Description ?? existingProject?.Description ?? "",
        "Image Source": projectUpdates["Image Source"] ?? existingProject?.["Image Source"] ?? "",
        publishedAt: projectUpdates.publishedAt
          ? new Date(projectUpdates.publishedAt)
          : existingProject?.publishedAt,
        public: projectUpdates.public ?? existingProject?.public ?? false,
        status: projectUpdates.status ?? existingProject?.status ?? "draft",
        tags: projectUpdates.tags ?? existingProject?.tags ?? [],
      };

      const result = await projectService.update(updatedProject);
      if (!result.success)
        return errorResponse(c, result.error.code, result.error.message);
      return c.json(result.data);
    } catch (error) {
      console.error('Error in PUT /:id handler:', error);
      return errorResponse(c, "INTERNAL_SERVER_ERROR", "Error updating project");
    }
  });

  app.delete("/:id", async (c) => {
    try {
      const projectId = c.req.param("id");
      const deleted = await projectService.remove(projectId);
      if (!deleted.success)
        return errorResponse(c, deleted.error.code, deleted.error.message);
      return c.json({ message: "Project deleted successfully!" });
    } catch (error) {
      console.error('Error in DELETE /:id handler:', error);
      return errorResponse(c, "INTERNAL_SERVER_ERROR", "Error deleting project");
    }
  });

  return app;
};
