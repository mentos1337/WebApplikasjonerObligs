import 'dotenv/config';
import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { serve } from "@hono/node-server";

import db, { type DB } from "./db/db";
import { setup } from "./db/setup";
import { makeLogger, type Logger } from "./lib/logger";
import { type ServerEnv, env } from "./lib/env";
import { handleError } from "./lib/error";
import { projectService } from "./features/projects/service/projectService";
import { projectController } from "./features/projects/controller/projectController";

export type ServiceContext = {
  db: DB;
  logger: Logger;
};

export type HonoEnv = {
  Bindings: ServerEnv;
  Variables: {
    services: ServiceContext;
  };
};

export const makeApp = async (
  database: DB = db,
  logger: Logger = makeLogger({ logLevel: env.LOG_LEVEL, env: env.NODE_ENV })
) => {
  await setup(database);

  const app = new Hono<HonoEnv>();
  app.use(
    "/*",
    cors({
      origin: env.FRONTEND_URL,
      credentials: true,
    })
  );
  app.use(prettyJSON());
  app.use("*", async (c, next) => {
    c.set("services", {
      logger,
      db: database,
    });
    await next();
  });

  app.route("/json", projectController(projectService));

  app.onError(handleError);

  return app;
};



const app = await makeApp();
process.env.PORT = env.PORT?.toString() || "3000";


serve(app);

console.log(`Server is running on port ${process.env.PORT}`);


export default app;
