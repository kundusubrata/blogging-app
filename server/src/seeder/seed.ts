import { faker } from "@faker-js/faker";
import prisma from "../config/prisma";

async function seed() {
  try {
    console.log("Seeding database...");

    // Create Users
    const users = await Promise.all(
      Array.from({ length: 5 }).map(() =>
        prisma.user.create({
          data: {
            email: faker.internet.email(),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            password: faker.internet.password(),
          },
        })
      )
    );

    // Create Posts with Likes and Comments
    for (const user of users) {
      const post = await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(2),
          authorId: user.id,
          likes: {
            create: users
              .slice(0, 3) 
              .map((u) => ({
                userId: u.id,
              })),
          },
          comments: {
            create: users
              .slice(0, 2)
              .map((u) => ({
                content: faker.lorem.sentence(),
                authorId: u.id,
              })),
          },
        },
      });
    }

    console.log("Seeding completed!");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
