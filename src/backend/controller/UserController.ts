// src/controller/UserController.ts
import { Request, Response } from "express";
import * as UserService from "../service/UserService";
import { AbstractController } from "./AbstractController";

export class UserController extends AbstractController {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      this.sendSuccess(res, users, "Users fetched successfully");
    } catch (error) {
      console.error("Error fetching users:", error);
      this.sendError(res, "Failed to fetch users");
    }
  }
}
