import React, { useState, useEffect, useCallback } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import {Project} from './components/Types';
import { deleteProject, fetchProjects, submitProject } from './services/api';

const Portofoliopage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    console.log('Fetching data...');
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (error) {
      setError('Feilet ved henting av data');
    } finally {
      setLoading(false);
      console.log('Finished fetching data');
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleProjectSubmit = async (newProject: Project) => {
    try {
      setLoading(true);
      await submitProject(newProject);
      await fetchData();
    } catch (error) {
      setError('Error submitting project');
    } finally {
      setLoading(false);
    }
  };
  

  const handleDeleteProject = async (projectId: string) => {
    try {
      setLoading(true);
      await deleteProject(projectId);
      await fetchData();
    } catch (error) {
      setError('Error deleting project');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <header>
        <h1>New Project</h1>
      </header>
      {loading && <p>Henter data...</p>}
      {error && <p className="error">{error}</p>}
      <ProjectForm onSubmit={handleProjectSubmit} />
      <section className="ViewProjectHeader">
        <header>
          <h2>Projects</h2>
        </header>
        <button className="ShowAllProjects" onClick={async () => { const data = await fetchProjects(); setProjects(data); } }>
          Show all projects
        </button>
      </section>
      <ProjectList projects={projects} onDelete={handleDeleteProject} />
    </>
  );
};
  
  export default Portofoliopage;