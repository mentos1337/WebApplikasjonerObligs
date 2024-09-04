import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFile } from "node:fs/promises";

const app = new Hono();

app.use("/*", cors());

app.use("/statics/*", serveStatic({ root: "./" }));

app.get("/json", async (c) => {
    const data = await readFile("./ProjectData.json", "utf-8");
  return c.json(JSON.parse(data));
});

const port = 4000;

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
});