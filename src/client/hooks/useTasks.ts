import { useState, useEffect } from "react";
import taskApi from "../api/taskApi";
import { useUsers } from "./useUsers";
import { TaskStatus } from "../type/TaskStatusEnum";
import { Task } from "../models/task";
import { User } from "../models/User";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { users } = useUsers();

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await taskApi.fetchTasks();
      setTasks(data);
      setError(null);
    } catch {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (taskData: Partial<Task>) => {
    const newTask = await taskApi.createTask(taskData);
    setTasks((prev) => [...prev, newTask]);
  };

  const isValidStatusTransition = (
    current: TaskStatus,
    next: TaskStatus
  ): boolean => {
    switch (current) {
      case TaskStatus.InProgress:
        return next === "DONE" || next === TaskStatus.ToDo;
      case TaskStatus.ToDo:
        return next === TaskStatus.InProgress;
      case TaskStatus.Done:
        return false; // or true if reopening allowed
      default:
        return false;
    }
  };

  const changeStatus = async (id: number, newStatus: TaskStatus) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    if (!isValidStatusTransition(task.status, newStatus)) {
      console.warn(
        `Invalid status transition from ${task.status} to ${newStatus}`
      );
      return;
    }

    await taskApi.updateTaskStatus(id, newStatus);

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const assign = async (id: number, assigneeId: number | null) => {
    await taskApi.assignTask(id, assigneeId);
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              assignee: users.find((u: User) => u.id === assigneeId) || null,
            }
          : task
      )
    );
  };

  return { tasks, loading, error, addTask, changeStatus, assign };
};
