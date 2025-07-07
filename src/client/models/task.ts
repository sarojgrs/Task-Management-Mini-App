import { Task } from "@mui/icons-material";
import { TaskStatus } from "../type/TaskStatusEnum";
import { User } from "./User";

export interface Task {
  id: number;
  number: string;
  title: string;
  description: string;
  status: TaskStatus;
  created: string;
  submitter: User;
  assignee?: User | null;
}
