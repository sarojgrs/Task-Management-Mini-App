import { useCallback, useEffect } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useTasks } from "../hooks/useTasks";
import { useUsers } from "../hooks/useUsers";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { TaskStatus } from "../type/TaskStatusEnum";
import Toaster from "../components/Toaster";
import { useToaster } from "../hooks/useToaster";
import { Severity } from "../type/SeverityEnum";

function DashboardPage() {
  const { tasks, addTask, assign, changeStatus, error: taskError } = useTasks();
  const { users, loading: usersLoading, error: userError } = useUsers();

  const { toaster, showToaster, closeToaster } = useToaster();

  useEffect(() => {
    if (taskError) showToaster(taskError, Severity.Error);
  }, [taskError, showToaster]);

  useEffect(() => {
    if (userError) showToaster(userError, Severity.Error);
  }, [userError, showToaster]);

  const handleAddTask = useCallback(
    async (data: { title: string; description: string; submitter: any }) => {
      try {
        await addTask({
          ...data,
          created: new Date().toISOString(),
          status: TaskStatus.ToDo,
          assignee: null,
        });
        showToaster("Task created successfully!", Severity.Success);
      } catch {
        showToaster("Failed to create task.", Severity.Success);
      }
    },
    [addTask, showToaster]
  );

  const handleAssign = useCallback(
    async (id: number, assigneeId: number | null): Promise<void> => {
      if (assigneeId === null) return;
      await assign(id, assigneeId);
      await changeStatus(id, TaskStatus.InProgress);
    },
    [assign, changeStatus]
  );

  const handleStatusChange = useCallback(
    async (id: number, newStatus: TaskStatus): Promise<void> => {
      // Get the current status of the task
      const currentTask = tasks.find((task) => task.id === id);
      const oldStatus = currentTask?.status;

      // If moving from DONE to TO_DO or IN_PROGRESS, do not unassign
      const wasDone = oldStatus === TaskStatus.Done;

      await changeStatus(id, newStatus);

      // Unassign only if moving *to* TO_DO and it was not already DONE
      if (newStatus === TaskStatus.ToDo && !wasDone) {
        await assign(id, null);
      }
    },
    [changeStatus, assign, tasks]
  );

  if (usersLoading)
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
      >
        {/* <CircularProgress /> */}
        <Typography variant="body1" mt={2}>
          Loading users...
        </Typography>
      </Box>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={3}>
        <AssignmentIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
        <Typography variant="h4" component="h1">
          Task Management
        </Typography>
      </Box>

      {/* Task Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add New Task
        </Typography>
        <TaskForm users={users} onAdd={handleAddTask} />
      </Paper>

      {/* Task List */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Task List
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <TaskList
          tasks={tasks}
          users={users}
          onAssign={handleAssign}
          onStatusChange={handleStatusChange}
        />
      </Paper>

      {/* Toaster for all messages */}
      <Toaster
        open={toaster.open}
        message={toaster.message}
        severity={toaster.severity}
        onClose={closeToaster}
      />
    </Container>
  );
}

export default DashboardPage;
