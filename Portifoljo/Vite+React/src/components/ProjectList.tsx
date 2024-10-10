import React from 'react';
import { Project } from './Types';

type ProjectListProps = {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <section className="DisplayProjects">
      <div>
        <ul id="Projects">
          {projects.map((project, index) => (
            <li key={index}>
              <img 
                id="projectImage"
                src={project["Image Source"]}
                alt={project.Title}
                width="250"
                height="250"
              />
              <article className='ProjectDescription'>
                <h3>{project.Title}</h3>
                <p>{project.Description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProjectList;
