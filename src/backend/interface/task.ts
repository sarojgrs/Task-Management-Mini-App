import { TaskStatus } from "../type/TaskStatusEnum";

export interface Task {
  number: string;
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  submitter: { id: number; name?: string };
  assignee?: { id: number; name?: string } | null;
}
