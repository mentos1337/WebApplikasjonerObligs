import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { readFile, writeFile } from "node:fs/promises";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

app.use("/*", cors());

app.get("/statics/*", serveStatic({ root: "./dist" }));

app.get("/json", async (c) => {
  try {
    const data = await readFile("./honoserver/ProjectData.json", "utf-8");
    const parsedData = JSON.parse(data);
    return c.json(parsedData.ProjectInformation);
  } catch (error) {
    return c.json({ message: "Error reading data", error }, 500);
  }
});

app.post("/json", async (c) => {
  try {
    const newProject = await c.req.json();

    const data = await readFile("./honoserver/ProjectData.json", "utf-8");
    const parsedData = JSON.parse(data);


    parsedData.ProjectInformation.push(newProject);

    await writeFile("./honoserver/ProjectData.json", JSON.stringify(parsedData, null, 2));

    return c.json({ message: "Project added successfully!", projects: parsedData.ProjectInformation });
  } catch (error) {
    return c.json({ message: "Error writing data", error }, 500);
  }
});

app.delete("/json/:id", async (c) => {
  try {
    const projectId = c.req.param("id");
    
    const data = await readFile("./honoserver/ProjectData.json", "utf-8");
    const parsedData = JSON.parse(data);

    const projectIndex = parsedData.ProjectInformation.findIndex((project: { Id: string }) => project.Id === projectId);
    
    if (projectIndex === -1) {
      return c.json({ message: "Project not found" }, 404);
    }

    parsedData.ProjectInformation.splice(projectIndex, 1);

    await writeFile("./honoserver/ProjectData.json", JSON.stringify(parsedData, null, 2));

    return c.json({ message: "Project deleted successfully!" });
  } catch (error) {
    return c.json({ message: "Error deleting data", error }, 500);
  }
});


const port = 4000;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
