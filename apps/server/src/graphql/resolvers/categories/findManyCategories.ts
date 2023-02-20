import prisma from '../../../prisma/client';

const getCategories = async () => {
  return await prisma.categories.groupBy({
    by: ['name'],
    orderBy: { name: 'asc' },
  });
};

export { getCategories };
