import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const tags = JSON.parse(readFileSync('src/prisma/seeds/tags.json', 'utf-8'));

  const categoriesId = [];

  for (const tag of tags) {
    const res = await prisma.tag.create({
      data: {
        ...tag,
        categories: {
          create: tag.categories,
        },
      },
    });
    categoriesId.push(res.id);
  }

  console.log(`Seeding finished.`);
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
