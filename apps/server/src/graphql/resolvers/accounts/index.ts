import prisma from '../../../prisma/client';

const findAccounts = async () => {
  return await prisma.account.groupBy({
    by: ['name'],
    orderBy: { name: 'asc' },
  });
};

export { findAccounts };
