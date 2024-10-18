import React from 'react';
import { Project } from './Types';
import { formatDate, formatImage } from '../helpers/format';

type ProjectListProps = {
  projects: Project[];
  onDelete: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onDelete }) => {
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
                {project.createdAt && (
                  <p>Opprettet {formatDate(new Date(project.createdAt))}</p>
                )}
              </article>
              <button className='deleteProject' onClick={() => onDelete(project.Id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProjectList;