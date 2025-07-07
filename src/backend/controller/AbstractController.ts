import { Request, Response } from "express";
import { ResponseData } from "../interface/responseData";

export abstract class AbstractController {
  protected sendSuccess<T>(res: Response, data: T, message: string) {
    const response: ResponseData<T> = {
      data,
      message,
      success: true,
    };
    res.json(response);
  }

  protected sendCreated<T>(res: Response, data: T, message: string) {
    const response: ResponseData<T> = {
      data,
      message,
      success: true,
    };
    res.status(201).json(response);
  }

  protected sendError(
    res: Response,
    message = "Internal Server Error",
    statusCode = 500
  ) {
    const response: ResponseData<null> = {
      data: null,
      message,
      success: false,
    };
    res.status(statusCode).json(response);
  }
}
