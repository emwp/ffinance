import prisma from '../../../prisma/client';

const getBanks = async () => {
  return await prisma.accounts.groupBy({
    by: ['bank'],
  });
};

export { getBanks };
