import express from "express";
import { APP_PORT } from "./config/const";
import { defineRoutes } from "./config/routes";
import { useRequestMiddlewares } from "./middlewares/request";

const app = express();

useRequestMiddlewares(app);
defineRoutes(app);

app.listen(APP_PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${APP_PORT}`);
});
