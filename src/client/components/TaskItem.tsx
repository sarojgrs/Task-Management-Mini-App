import React from "react";
import { TableRow, TableCell } from "@mui/material";
import { TaskStatus } from "../type/TaskStatusEnum";
import { User } from "../models/User";
import { Task } from "../models/task";
import Dropdown from "./Dropdown";

interface Props {
  task: Task;
  users: User[];
  onAssign: (taskId: number, assigneeId: number | null) => Promise<void>;
  onStatusChange: (taskId: number, newStatus: TaskStatus) => Promise<void>;
  rowStyle?: object;
}

const cellFontStyle = { fontSize: 14 };

const TaskItem: React.FC<Props> = ({
  task,
  users,
  onAssign,
  onStatusChange,
  rowStyle = {},
}) => {
  const assigneeValue =
    task.assignee && task.assignee.id != null
      ? task.assignee.id.toString()
      : " ";

  const assigneeOptions = [
    ...users.map((u) => ({ label: u.name, value: u.id.toString() })),
  ];

  const statusOptions = [
    { label: "To Do", value: TaskStatus.ToDo },
    { label: "In Progress", value: TaskStatus.InProgress },
    { label: "Done", value: TaskStatus.Done },
  ];

  return (
    <TableRow sx={{ ...rowStyle }}>
      <TableCell sx={cellFontStyle}>{task.number}</TableCell>
      <TableCell sx={cellFontStyle}>{task.title}</TableCell>
      <TableCell sx={cellFontStyle}>
        <Dropdown
          value={assigneeValue}
          options={assigneeOptions}
          onChange={async (val) => {
            const selectedId = val === " " ? null : Number(val);
            await onAssign(task.id, selectedId);
          }}
          disabled={task.status === TaskStatus.Done}
          fontStyle={cellFontStyle}
        />
      </TableCell>
      <TableCell sx={cellFontStyle}>
        <Dropdown
          value={task.status}
          options={statusOptions}
          onChange={(val) => onStatusChange(task.id, val)}
          disabled={assigneeValue === " "}
          fontStyle={cellFontStyle}
        />
      </TableCell>
    </TableRow>
  );
};

export default TaskItem;
