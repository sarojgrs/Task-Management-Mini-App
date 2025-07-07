import { BaseApi } from "./coreBaseApi";
import { TaskStatus } from "../type/TaskStatusEnum";
import { Task } from "../models/task";

class TaskApi extends BaseApi {
  fetchTasks(): Promise<Task[]> {
    return this.get<Task[]>("/tasks");
  }

  createTask(taskData: Partial<Task>): Promise<Task> {
    return this.post<Task>("/tasks", taskData);
  }

  updateTaskStatus(id: number, status: TaskStatus): Promise<void> {
    return this.patch<void>(`/tasks/${id}/status`, { status });
  }

  assignTask(id: number, assigneeId: number | null): Promise<Task> {
    return this.put<Task>(`/tasks/${id}/assign`, { assigneeId });
  }
}

export default new TaskApi();
