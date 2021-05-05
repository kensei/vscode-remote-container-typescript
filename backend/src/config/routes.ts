import { Express } from "express";
import { Root } from "../controllers/root";
import * as TaskController from "../controllers/api/todos";

export const defineRoutes = (app: Express) => {
  app.get("/", Root);
  app.get("/tasks", TaskController.getTasks);
  app.get("/tasks/:id", TaskController.getTaskById);
  app.post("/tasks/done", TaskController.updateTaskToDone);
  app.post("/tasks", TaskController.addTask);
  app.put("/tasks/:id", TaskController.updateTask);
  app.delete("/tasks/:id", TaskController.deleteTask);
};
