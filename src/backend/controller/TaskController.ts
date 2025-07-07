import { Request, Response } from "express";
import * as TaskService from "../service/TaskService";
import { AbstractController } from "./AbstractController";

export class TaskController extends AbstractController {
  async getTasks(req: Request, res: Response) {
    try {
      const tasks = await TaskService.TaskService.getAllTasks();
      this.sendSuccess(res, tasks, "Tasks fetched successfully");
    } catch (error) {
      console.error("Error fetching tasks:", error);
      this.sendError(res, "Failed to fetch tasks");
    }
  }

  async addTask(req: Request, res: Response) {
    try {
      const taskData = req.body;
      const newTask = await TaskService.TaskService.createTask(taskData);
      this.sendCreated(res, newTask, "Task created successfully");
    } catch (error) {
      console.error("Error creating task:", error);
      this.sendError(res, "Failed to create task");
    }
  }

  async updateTaskStatus(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;
      await TaskService.TaskService.updateTaskStatus(id, status);
      this.sendSuccess(res, null, "Task status updated successfully");
    } catch (error) {
      console.error("Error updating task status:", error);
      this.sendError(res, "Failed to update task status");
    }
  }

  async assignTask(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { assigneeId } = req.body;
      const updatedTask = await TaskService.TaskService.assignTask(
        id,
        assigneeId
      );
      this.sendSuccess(res, updatedTask, "Task assigned successfully");
    } catch (error) {
      console.error("Error assigning task:", error);
      this.sendError(res, "Failed to assign task");
    }
  }
}
