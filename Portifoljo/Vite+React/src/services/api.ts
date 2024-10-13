import { Project } from "../components/Types";

export const fetchProjects = async () => {
    const response = await fetch('http://localhost:4000/json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  };
  
  export const submitProject = async (newProject: Project) => {
    await fetch('http://localhost:4000/json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    });
  };

  export const deleteProject = async (projectId: string) => {
    await fetch(`http://localhost:4000/json/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  