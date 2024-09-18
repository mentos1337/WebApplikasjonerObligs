import React from 'react';
import { Project } from '../App';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <section className="DisplayProjects">
      <article>
        <ul id="Projects">
          {projects.map((project, index) => (
            <li key={index}>
              <article>
                <img
                  src={project["Image Source"]}
                  alt={project.Title}
                  width="250"
                  height="250"
                />
                <h3>{project.Title}</h3>
                <p>{project.Description}</p>
              </article>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default ProjectList;