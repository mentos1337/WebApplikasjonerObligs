import React from 'react';
import { Project } from './Types';
import { formatDate, formatImage } from '../helpers/format';

type ProjectListProps = {
  projects: Project[];
  onDelete: (projectId: string) => void;
  onEdit: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onDelete, onEdit }) => {
  return (
    <section className="DisplayProjects">
      <div>
        <ul id="Projects">
          {projects.map((project) => (
            <li key={project.Id}>
              <img 
                id="projectImage"
                src={formatImage(project["Image Source"])}
                alt={project.Title}
                width="250"
                height="250"
              />
              <article className='ProjectDescription'>
                <h3>{project.Title}</h3>
                <p>{project.Description}</p>
                {project.publishedAt && (
                  <p>Publisert {formatDate(new Date(project.publishedAt))}</p>
                )}
                <p>Status: {project.status}</p>
                <p>Offentlig: {project.public ? 'Ja' : 'Nei'}</p>
                {project.tags.length > 0 && (
                  <p>Tags: {project.tags.join(', ')}</p>
                )}
              </article>
              <button className='deleteProject' onClick={() => onDelete(project.Id)}>Delete</button>
              <button className='editProject' onClick={() => onEdit(project)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProjectList;