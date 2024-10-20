import { z } from "zod";

const projectSchema = z.object({
  Id: z.string().uuid(),
  Title: z.string().min(1, "Title is required"),
  Description: z.string().min(1, "Description is required"),
  "Image Source": z.string().url("Invalid image URL"),
  publishedAt: z.string().datetime({ message: "Invalid date format" }).optional(),
  public: z.boolean(),
  status: z.enum(['draft', 'published']),
  tags: z.array(z.string()).optional(),
});

const projectsSchema = z.array(projectSchema);

export { projectSchema, projectsSchema };