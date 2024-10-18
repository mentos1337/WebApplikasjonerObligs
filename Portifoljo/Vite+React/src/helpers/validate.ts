import { z } from "zod";

const projectSchema = z.object({
  Id: z.string().uuid(),
  Title: z.string().min(1, "Title is required"),
  Description: z.string().min(1, "Description is required"),
  "Image Source": z.string().url("Invalid image URL"),
  createdAt: z.string().datetime({ message: "Invalid date format" }),
});

const projectsSchema = z.array(projectSchema);

export { projectSchema, projectsSchema };