import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack, Container } from "@mui/material";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        textAlign="center"
      >
        <Typography variant="h2" color="text.secondary" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Sorry, the page you're looking for doesn't exist.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => navigate("/")}>
            Go Home
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
