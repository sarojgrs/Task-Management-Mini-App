import { PrismaClient, TaskStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed users (submitters and assignees)
  const users = await Promise.all([
    prisma.user.upsert({
      where: { name: "Alice" },
      update: {},
      create: { name: "Alice" },
    }),
    prisma.user.upsert({
      where: { name: "Bob" },
      update: {},
      create: { name: "Bob" },
    }),
    prisma.user.upsert({
      where: { name: "Charlie" },
      update: {},
      create: { name: "Charlie" },
    }),
  ]);

  // Create some example tasks
  await prisma.task.createMany({
    data: [
      {
        number: "TSK001",
        title: "Setup project repo",
        description:
          "Initialize git repository and create initial project structure",
        status: TaskStatus.TO_DO,
        submitterId: users[0].id,
        assigneeId: users[1].id,
      },
      {
        number: "TSK002",
        title: "Create task API",
        description: "Develop REST API endpoints for task management",
        status: TaskStatus.IN_PROGRESS,
        submitterId: users[1].id,
        assigneeId: users[2].id,
      },
      {
        number: "TSK003",
        title: "Implement frontend",
        description: "Build React UI for task submission and listing",
        status: TaskStatus.DONE,
        submitterId: users[2].id,
        assigneeId: users[0].id,
      },
    ],
  });

  console.log("Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
