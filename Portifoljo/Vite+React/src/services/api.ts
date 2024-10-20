import { endpoints } from '../config/urls';
import { Project } from '../components/Types';
import { projectsSchema } from '../helpers/validate';

export const fetchProjects = async () => {
  try {
    const response = await fetch(endpoints.projects, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    const parsedResult = projectsSchema.safeParse(data);

    if (!parsedResult.success) {
      console.error('Validation failed:', parsedResult.error.errors);
      return [];
    }

    const projectsWithDate = parsedResult.data.map((project: any) => ({
      ...project,
      publishedAt: project.publishedAt ? new Date(project.publishedAt) : null,
    }));

    return projectsWithDate;

  } catch (error) {
    console.error('Error fetching or validating projects:', error);
    return [];
  }
};

export const submitProject = async (newProject: Project) => {
  try {
    const url = newProject.Id ? `${endpoints.projects}/${newProject.Id}` : endpoints.projects;
    const method = newProject.Id ? 'PUT' : 'POST';

    const projectToSubmit = {
      ...newProject,
      publishedAt: newProject.publishedAt ? newProject.publishedAt.toISOString() : undefined,
    };

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectToSubmit),
    });
  } catch (error) {
    console.error('Error submitting project:', error);
  }
};

export const deleteProject = async (projectId: string) => {
  try {
    await fetch(`${endpoints.projects}/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error deleting project:', error);
  }
};