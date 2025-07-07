import express from "express";
import { TaskController } from "../controller/TaskController";

const taskController = new TaskController();

export default function taskRoutes() {
  const router = express.Router();

  router.get("/", (req, res) => taskController.getTasks(req, res));
  router.post("/", (req, res) => taskController.addTask(req, res));
  router.patch("/:id/status", (req, res) =>
    taskController.updateTaskStatus(req, res)
  );
  router.put("/:id/assign", (req, res) => taskController.assignTask(req, res));

  return router;
}
