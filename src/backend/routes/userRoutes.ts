import express from "express";
import { UserController } from "../controller/UserController";

const userController = new UserController();

export default function userRoutes() {
  const router = express.Router();

  router.get("/", (req, res) => userController.getUsers(req, res));

  return router;
}
