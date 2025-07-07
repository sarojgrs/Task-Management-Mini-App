import React, { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  IconButton,
  Box,
  AppBar,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Loader from "./components/Loader";
import useToggle from "./hooks/useToggle";

const App: React.FC = () => {
  const [mode, toggleMode] = useToggle<"light" | "dark">("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#1976d2" },
          secondary: { main: "#dc004e" },
          background: {
            default: mode === "dark" ? "#121212" : "#f5f5f5",
          },
        },
        typography: {
          fontFamily: "Roboto, Arial, sans-serif",
          fontSize: 14,
          h1: { fontSize: "2.5rem", fontWeight: 700 },
          h2: { fontSize: "2rem", fontWeight: 600 },
          body1: { fontSize: "1rem", lineHeight: 1.5 },
          button: {
            fontSize: "1rem",
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Loader />

      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Tooltip
            title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
          >
            <IconButton
              onClick={() => toggleMode(mode === "light" ? "dark" : "light")}
              color="inherit"
            >
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box p={2}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
