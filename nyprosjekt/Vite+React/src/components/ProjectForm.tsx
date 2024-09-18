import React, { useState } from 'react';
import { Project } from '../App';

interface ProjectFormProps {
  onSubmit: (newProject: Project) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
  const [projectName, setProjectName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [projectImage, setProjectImage] = useState<string>('https://placehold.co/250x250');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProjectImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      Title: projectName,
      Description: projectDescription,
      "Image Source": projectImage,
    };
    onSubmit(newProject);
    setProjectName('');
    setProjectDescription('');
    setProjectImage('https://placehold.co/250x250');
  };

  return (
    <section className="CreateProject">
      <figure>
        <img
          id="projectImage"
          src={projectImage}
          alt="Placeholder for project picture"
          width="250"
          height="250"
        />
        <figcaption>Add picture for project</figcaption>
      </figure>
      <form id="projectForm" onSubmit={handleSubmit}>
        <label htmlFor="PName">Project Title</label><br />
        <input
          type="text"
          id="PName"
          name="PName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        /><br />

        <label htmlFor="Description">Project Description</label><br />
        <textarea
          name="Description"
          id="Description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          required
        /><br />

        <label htmlFor="projectImageInput">Select Project Image</label><br />
        <input
          type="file"
          id="projectImageInput"
          name="projectImageInput"
          accept="image/*"
          onChange={handleImageChange}
        /><br />

        <input type="submit" value="Create Project" /><br />
      </form>
    </section>
  );
};

export default ProjectForm;
