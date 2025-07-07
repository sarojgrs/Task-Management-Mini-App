import { TaskStatus } from "@prisma/client";
import { Task } from "../interface/task";
import prisma from "../prisma/prismaClient";

export class TaskService {
  static async createTask(data: Task) {
    const number = await this.#generateNextTaskNumber();

    return prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        number,
        createdAt: data.createdAt,
        status: data.status,
        submitter: { connect: { id: data.submitter.id } },
        assignee: data.assignee?.id
          ? { connect: { id: data?.assignee?.id } }
          : undefined,
      },
    });
  }

  static async getAllTasks() {
    return prisma.task.findMany({
      include: { submitter: true, assignee: true },
    });
  }

  static async updateTaskStatus(id: number, status: TaskStatus) {
    return prisma.task.update({
      where: { id },
      data: { status },
    });
  }

  static async assignTask(id: number, assigneeId: number) {
    return prisma.task.update({
      where: { id },
      data: {
        assigneeId,
        ...(assigneeId !== null && { status: TaskStatus.IN_PROGRESS }),
      },
    });
  }

  static async #generateNextTaskNumber(): Promise<string> {
    const lastTask = await prisma.task.findFirst({
      orderBy: { number: "desc" },
      select: { number: true },
    });

    const nextIndex = lastTask?.number
      ? parseInt(lastTask.number.replace("TSK", ""), 10) + 1
      : 1;

    return `TSK${nextIndex.toString().padStart(3, "0")}`;
  }
}
