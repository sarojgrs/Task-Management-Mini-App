import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
} from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import TaskItem from "./TaskItem";
import { TaskStatus } from "../type/TaskStatusEnum";
import { User } from "../models/User";
import { Task } from "../models/task";

interface Props {
  tasks: Task[];
  users: User[];
  onAssign: (taskId: number, assigneeId: number | null) => Promise<void>;
  onStatusChange: (taskId: number, newStatus: TaskStatus) => Promise<void>;
}

const TaskList: React.FC<Props> = ({
  tasks,
  users,
  onAssign,
  onStatusChange,
}) => {
  const theme = useTheme();

  const getRowBackground = (index: number) =>
    index % 2 === 0
      ? "inherit"
      : alpha(
          theme.palette.text.primary,
          theme.palette.mode === "dark" ? 0.05 : 0.035
        );

  return (
    <TableContainer
      component={Paper}
      sx={{ mb: 4, borderRadius: 2, overflow: "hidden" }}
    >
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "grey.500" }}>
            <TableCell sx={{ fontWeight: 600 }}>Number</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Assignee</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              users={users}
              onAssign={onAssign}
              onStatusChange={onStatusChange}
              rowStyle={{ backgroundColor: getRowBackground(index) }}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;
