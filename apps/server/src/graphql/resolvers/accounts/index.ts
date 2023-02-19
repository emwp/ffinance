import prisma from '../../../prisma/client';

const getAccounts = async () => {
  return await prisma.accounts.findMany();
};

export { getAccounts };
