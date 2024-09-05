import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFile, writeFile } from "node:fs/promises";

const app = new Hono();

app.use("/*", cors());

app.use("/statics/*", serveStatic({ root: "./" }));

app.get("/json", async (c) => {
    const data = await readFile("./ProjectData.json", "utf-8");
    const parsedData = JSON.parse(data);
    return c.json(parsedData.ProjectInformation);
});

app.post("/json", async (c) => {
    const newProject = await c.req.json();
    
    const data = await readFile("./ProjectData.json", "utf-8");
    const parsedData = JSON.parse(data);

    newProject.Id = parsedData.ProjectInformation.length + 1;

    parsedData.ProjectInformation.push(newProject);

    await writeFile("./ProjectData.json", JSON.stringify(parsedData, null, 2));

    return c.json({ message: "Project added successfully!", projects: parsedData.ProjectInformation });
});

const port = 4000;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
