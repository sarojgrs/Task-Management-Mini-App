import express from "express";
import taskRoutes from "../routes/taskRoutes";
import userRoutes from "../routes/userRoutes";

const router = express.Router();

router.use("/tasks", taskRoutes());
router.use("/users", userRoutes());

export default router;
