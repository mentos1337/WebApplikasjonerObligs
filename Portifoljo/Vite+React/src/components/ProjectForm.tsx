import { v4 as uuidv4 } from 'uuid';
import { Project } from "./Types";
import { useState, useEffect } from "react";
import { formatImage } from '../helpers/format';
import { projectSchema } from '../helpers/validate';
import { z } from 'zod';

type ProjectFormProps = {
  onSubmit: (newProject: Project) => void;
  currentProject?: Project | null;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, currentProject }) => {
  const [projectName, setProjectName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [projectImage, setProjectImage] = useState<string>('https://placehold.co/250x250');
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (currentProject) {
      setProjectName(currentProject.Title);
      setProjectDescription(currentProject.Description);
      setProjectImage(currentProject["Image Source"]);
      setIsPublic(currentProject.public);
      setStatus(currentProject.status);
      setTags(currentProject.tags);
    } else {
      setProjectName('');
      setProjectDescription('');
      setProjectImage('https://placehold.co/250x250');
      setIsPublic(true);
      setStatus('draft');
      setTags([]);
    }
  }, [currentProject]);

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

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject: Project = {
      Id: currentProject?.Id || uuidv4(),
      Title: projectName,
      Description: projectDescription,
      "Image Source": projectImage,
      publishedAt: status === 'published' ? currentProject?.publishedAt || new Date() : undefined,
      public: isPublic,
      status,
      tags,
    };

    try {
      projectSchema.parse({
        ...newProject,
        publishedAt: newProject.publishedAt?.toISOString(),
      });
      setError(null);
      onSubmit(newProject);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError("Validation failed: " + err.errors.map(e => e.message).join(", "));
      }
    }
  };

  return (
    <section className="CreateProject">
      <figure>
        <img
          id="projectImage"
          src={formatImage(projectImage)}
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

        <label>
          Public:
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </label><br />

        <label htmlFor="status">Status:</label><br />
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select><br />

        <label>Tags</label><br />
        <input
          type="text"
          value={tagInput}
          onChange={handleTagInputChange}
        />
        <button type="button" onClick={handleAddTag}>Add Tag</button><br />
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul><br />

        <input type="submit" value={currentProject ? "Update Project" : "Create Project"} /><br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </section>
  );
};

export default ProjectForm;