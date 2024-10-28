import type { Result } from "../types/types";
import {
  projectRepository,
  type ProjectRepository,
} from "../repository/projectRepository";
import type { Project } from "../types/types";
import { ResultHandler } from "../../../lib/result";

export const createProjectService = (projectRepository: ProjectRepository) => {
  const getById = async (Id: string): Promise<Result<Project>> => {
    const result = await projectRepository.getById(Id);
    if (!result.success) return result;

    return ResultHandler.success(result.data);
  };

  const list = async (): Promise<Result<Project[]>> => {
    const result = await projectRepository.list();
    if (!result.success) return result;

    return ResultHandler.success(result.data);
  };

  const create = async (data: Project): Promise<Result<string>> => {
    if (!data.Title || !data.Description) {
      return ResultHandler.failure("Invalid project data", "BAD_REQUEST");
    }
    return projectRepository.create(data);
  };

  const update = async (data: Project): Promise<Result<Project>> => {
    const projectResult = await projectRepository.getById(data.Id);
    if (!projectResult.success) {
      const createResult = await projectRepository.create(data);
      if (!createResult.success) return createResult;
      return ResultHandler.success(data);
    }

    const updateResult = await projectRepository.update(data);
    if (!updateResult.success) return updateResult;

    return ResultHandler.success(updateResult.data);
  };

  const publish = async (Id: string): Promise<Result<Project>> => {
    const result = await projectRepository.getById(Id);
    if (!result.success)
      return ResultHandler.failure(result.error.message, result.error.code);

    const updatedProjectData: Project = {
      ...result.data,
      status: "published",
      publishedAt: new Date(),
    };

    const updateResult = await projectRepository.update(updatedProjectData);
    if (!updateResult.success)
      return ResultHandler.failure(
        updateResult.error.message,
        updateResult.error.code
      );

    return ResultHandler.success(updateResult.data);
  };

  const remove = async (Id: string): Promise<Result<string>> => {
    return projectRepository.remove(Id);
  };

  return {
    list,
    create,
    update,
    getById,
    remove,
    publish,
  };
};

export const projectService = createProjectService(projectRepository);

export type ProjectService = ReturnType<typeof createProjectService>;
