import prisma from '../../../prisma/client';

const getCategories = async () => {
  return await prisma.category.findMany();
};

export { getCategories };
