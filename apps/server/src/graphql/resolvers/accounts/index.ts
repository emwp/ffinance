import prisma from '../../../prisma/client';

const getAccounts = async () => {
  return await prisma.accounts.groupBy({
    by: ['name'],
    orderBy: { name: 'asc' },
  });
};

export { getAccounts };
