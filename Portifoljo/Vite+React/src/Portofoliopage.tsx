import React from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import { useProjects } from './hooks/useProjects';
import { Project } from './components/Types';

const Portofoliopage: React.FC = () => {
  const { projects, loading, error, addOrUpdateProject, removeProject, editProject, currentProject } = useProjects();

  const handleProjectSubmit = async (newProject: Project) => {
    await addOrUpdateProject(newProject);
  };

  const handleDeleteProject = async (projectId: string) => {
    await removeProject(projectId);
  };

  const handleEditProject = (project: Project) => {
    editProject(project);
  };

  return (
    <>
      <header>
        <h1>{currentProject ? 'Edit Project' : 'New Project'}</h1>
      </header>
      {loading && <p>Henter data...</p>}
      {error && <p className="error">{error}</p>}
      <ProjectForm onSubmit={handleProjectSubmit} currentProject={currentProject} />
      <section className="ViewProjectHeader">
        <header>
          <h2>Projects</h2>
        </header>
      </section>
      <ProjectList projects={projects} onDelete={handleDeleteProject} onEdit={handleEditProject} />
    </>
  );
};

export default Portofoliopage;
