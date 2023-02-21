import prisma from '../../../prisma/client';

const findBanks = async () => {
  return await prisma.account.groupBy({
    by: ['bank'],
  });
};

export { findBanks };
