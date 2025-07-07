import React, { useState } from "react";
import { TextField, Button, MenuItem, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { User } from "../models/User";

interface Props {
  users: User[];
  onAdd: (data: {
    title: string;
    description: string;
    submitter: User;
  }) => void;
}

const TaskForm: React.FC<Props> = ({ users, onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitterId, setSubmitterId] = useState<number>(users[0]?.id ?? 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitter = users.find((u) => u.id === submitterId);
    if (!submitter) return;

    onAdd({ title, description, submitter });
    setTitle("");
    setDescription("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
        margin="normal"
      />

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />

      <TextField
        select
        label="Submitter"
        value={submitterId}
        onChange={(e) => setSubmitterId(Number(e.target.value))}
        fullWidth
        margin="normal"
      >
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name}
          </MenuItem>
        ))}
      </TextField>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!title || !description}
        startIcon={<AddIcon />}
        sx={{ mt: 2 }}
      >
        Create Task
      </Button>
    </Box>
  );
};

export default TaskForm;
