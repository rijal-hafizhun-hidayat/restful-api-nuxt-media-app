import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.role.createMany({
    data: [
      {
        name: "admin",
      },
      {
        name: "user",
      },
      {
        name: "guest",
      },
    ],
  });
  const notificationTypes = await prisma.notification_type.createMany({
    data: [
      {
        id: 1,
        name: "like",
      },
      {
        id: 2,
        name: "comment",
      },
    ],
  });
  console.log(roles);
  console.log(notificationTypes);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
