import { categories, Prisma, PrismaClient } from '@prisma/client';
import { expect, describe, it, afterAll } from 'vitest';
import { faker } from '@faker-js/faker';
import { getCategories } from '../findManyCategories';

const prisma = new PrismaClient();

const createCategories = () => {
  return {
    id: faker.datatype.uuid(),
    name: faker.datatype.uuid(),
    color: faker.color.rgb().slice(2),
  };
};

afterAll(async () => {
  await prisma.$disconnect();
});

describe('createUserAction() - unit', () => {
  it.skip('creates new category', async () => {
    const category = createCategories();

    const result = await prisma.categories.create({
      data: category,
    });

    expect(result).toEqual(category);
  });

  it.skip('', async () => {
    const firstData = createCategories();
    const secondData = createCategories();

    // const first = await prisma.categories.create({
    //   data: firstData,
    // });

    // const second = await prisma.categories.create({
    //   data: secondData,
    // });

    const categories = await (
      await getCategories()
    ).reduce((acc, curr) => {
      acc.push(curr.name);
    }, [] as string[]);

    console.dir({ categories });

    // expect(categories.length).toBeGreaterThanOrEqual(2);

    // const potato = categories.reduce((acc, curr) => {
    //   console.log({ first: first.name });
    //   if (curr.name === first.name || curr.name === second.name) {
    //     acc + 1;
    //   }
    //   return acc;
    // }, 10);

    // expect(potato).toBe(2);
  });
});
