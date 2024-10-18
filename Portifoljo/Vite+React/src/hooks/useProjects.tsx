import { useState, useCallback, useEffect } from 'react';
import { fetchProjects, submitProject, deleteProject } from '../services/api';
import { Project } from '../components/Types';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      setError('Feilet ved henting av data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addProject = async (newProject: Project) => {
    setLoading(true);
    try {
      await submitProject(newProject);
      await fetchData();
    } catch (error) {
      setError('Error submitting project');
    } finally {
      setLoading(false);
    }
  };

  const removeProject = async (projectId: string) => {
    setLoading(true);
    try {
      await deleteProject(projectId);
      await fetchData();
    } catch (error) {
      setError('Error deleting project');
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    fetchData,
    addProject,
    removeProject,
  };
}
