import React, { useEffect } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import {Project} from './components/Types';
import { useProjects } from './hooks/useProjects';

const Portofoliopage: React.FC = () => {

  const { projects, loading, error, addProject, removeProject } = useProjects();

  const handleProjectSubmit = async (newProject: Project) => {
    await addProject(newProject);
  };

  const handleDeleteProject = async (projectId: string) => {
    await removeProject(projectId); 
  };

  function fetchData(): void {
    throw new Error('Function not implemented.');
  }

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
        <button className="ShowAllProjects" onClick={() => fetchData()}>
          Show all projects
        </button>
      </section>
      <ProjectList projects={projects} onDelete={handleDeleteProject} />
    </>
  );
};

export default Portofoliopage;