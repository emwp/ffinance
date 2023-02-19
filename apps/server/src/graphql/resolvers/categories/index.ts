import prisma from '../../../prisma/client';

const getCategories = async () => {
  return await prisma.categories.findMany();
};

export { getCategories };
