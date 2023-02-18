import prisma from '../../../prisma/client';

const getBanks = async () => {
  return await prisma.bank.findMany();
};

export { getBanks };
