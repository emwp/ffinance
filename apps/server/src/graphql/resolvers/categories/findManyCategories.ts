import prisma from '../../../../prisma/client';

const findCategories = async () => {
  return await prisma.category.groupBy({
    by: ['name'],
    orderBy: { name: 'asc' },
  });
};

export { findCategories };
